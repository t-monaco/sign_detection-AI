type CameraOffProps = {
    height: number | string;
    width: number | string;
};

const CameraOff: React.FC<CameraOffProps> = ({ width, height }) => (
    <div
        className={`w-[${width}px] h-[${height}px] rounded-[1rem] bg-black text-white flex items-center justify-center`}
    >
        CAMERA OFF...
    </div>
);

export default CameraOff;
