import * as tf from "@tensorflow/tfjs";
import { useEffect, useRef, useState } from "react";
import { ReactWebcam, WebcamToggleBtn } from "./components";
import Webcam from "react-webcam";
import { drawDetection } from "./utils/utils";

const CAP_WIDTH = 720;
const CAP_HEIGHT = 450;

function App() {
    const [cameraState, setCameraState] = useState(true);
    const webcamRef = useRef<Webcam | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const connModel = async () => {
        const net = await tf.loadGraphModel(
            "https://tensorflowjs-signdetection.s3.eu-de.cloud-object-storage.appdomain.cloud/model.json"
        );

        //  Loop and detect hands
        setInterval(() => {
            detect(net);
        }, 16.7);
    };

    const detect = async (net: tf.GraphModel<string | tf.io.IOHandler>) => {
        // Check data is available
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video &&
            webcamRef.current.video.readyState === 4
        ) {
            // Get Video Properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            // Set video width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            // Make Detections
            const img = tf.browser.fromPixels(video);
            const resized = tf.image.resizeBilinear(img, [720, 450]);
            const casted = resized.cast("int32");
            const expanded = casted.expandDims(0);
            const obj: any = await net.executeAsync(expanded); // TODO Better typing

            const boxes = await obj[1].array();
            const classes = await obj[2].array();
            const scores = await obj[4].array();

            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext("2d");

            // Update drawing utility
            if (!ctx) return;
            const drawRectParams = {
                boxes: boxes[0],
                classes: classes[0],
                scores: scores[0],
                threshold: 0.5,
                imgWidth: videoWidth,
                imgHeight: videoHeight,
                ctx,
            };

            requestAnimationFrame(() => {
                drawDetection(drawRectParams);
            });

            // Dispose variables in order to free some memory
            tf.dispose(img);
            tf.dispose(resized);
            tf.dispose(casted);
            tf.dispose(expanded);
            tf.dispose(obj);

            return drawRectParams;
        }
    };

    useEffect(() => {
        connModel();
    }, []);

    return (
        <div className="bg-gradient-to-r from-teal-400 to-teal-600 flex flex-col items-center h-screen	justify-center gap-12">
            <h2 className="text-3xl font-bold">Sing Detection Model</h2>
            <ul className="flex gap-4">
                <li>Hello</li>
                <li>Yes</li>
                <li>No</li>
                <li>Thank You</li>
                <li>I Love You</li>
            </ul>
            <ReactWebcam
                videoConstraints={{ width: CAP_WIDTH, height: CAP_HEIGHT }}
                width={CAP_WIDTH}
                height={CAP_HEIGHT}
                cameraState={cameraState}
                style={{ borderRadius: "1rem" }}
                ref={webcamRef}
                canvasRef={canvasRef}
            />
            <WebcamToggleBtn
                cameraState={cameraState}
                setCameraState={setCameraState}
            />
        </div>
    );
}

export default App;
