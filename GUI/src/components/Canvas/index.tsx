import { forwardRef } from "react";

type CanvasProps = React.CanvasHTMLAttributes<HTMLCanvasElement> & {};

const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
    ({ ...props }, ref: any) => {
        return <canvas ref={ref} {...props} />;
    }
);

export default Canvas;
