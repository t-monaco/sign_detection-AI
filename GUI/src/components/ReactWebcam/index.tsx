import * as tf from "@tensorflow/tfjs";
import { forwardRef } from "react";
import Webcam, { WebcamProps } from "react-webcam";
import Canvas from "../Canvas";
import CameraOff from "../CameraOff";

type ReactWebcamProps = Partial<WebcamProps> & {
    cameraState: boolean;
    modelConnection: () => Promise<tf.GraphModel<string | tf.io.IOHandler>>;
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
};

const ReactWebcam: React.FC<ReactWebcamProps> = forwardRef(
    ({ cameraState, canvasRef, ...props }, ref: any) => {
        return cameraState ? (
            <div className={`relative w-[720px] h-[450px]`}>
                <Webcam
                    className={`absolute top-0 left-0 w-full h-full`}
                    {...props}
                    ref={ref}
                />
                <Canvas
                    className={`absolute top-0 left-0`}
                    width={props.width}
                    height={props.height}
                    // @ts-ignore
                    ref={canvasRef}
                />
            </div>
        ) : (
            <CameraOff
                width={props.width ?? 720}
                height={props.height ?? 450}
            />
        );
    }
);

export default ReactWebcam;
