// Define label map
const labelMap = [
    { name: "Hello", color: "green" },
    { name: "Thank You", color: "blue" },
    { name: "No", color: "red" },
    { name: "Yes", color: "yellow" },
    { name: "I Love You", color: "pink" },
];

export const drawDetection = ({
    boxes,
    classes,
    scores,
    threshold,
    imgWidth,
    imgHeight,
    ctx,
}: {
    boxes: any;
    classes: any;
    scores: any;
    threshold: number;
    imgWidth: number;
    imgHeight: number;
    ctx: CanvasRenderingContext2D;
}) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i] && classes[i] && scores[i] > threshold) {
            // Get variables
            const [y, x, height, width] = boxes[i];
            const labelId = classes[i] - 1;

            // Style
            ctx.strokeStyle = labelMap[labelId]["color"];
            ctx.lineWidth = 10;
            ctx.fillStyle = "white";
            ctx.font = "30px Arial";

            // Draw
            ctx.beginPath();
            ctx.fillText(
                `${labelMap[labelId]["name"]} - ${Math.round(
                    scores[i] * 100
                )}%`,
                x * imgWidth,
                y * imgHeight - 10
            );
            ctx.rect(
                x * imgWidth,
                y * imgHeight,
                (width * imgWidth) / 2,
                (height * imgHeight) / 1.5
            );
            ctx.stroke();
        }
    }
};
