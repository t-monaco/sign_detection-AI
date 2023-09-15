import { forwardRef } from "react";

type CanvasProps = React.CanvasHTMLAttributes<HTMLCanvasElement> & {};

const Canvas: React.FC<CanvasProps> = forwardRef(({ ...props }, ref: any) => {
    return <canvas ref={ref} {...props} />;
});

export default Canvas;
