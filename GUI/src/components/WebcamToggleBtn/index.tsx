type WebcamToggleBtnProps = {
    cameraState: boolean;
    setCameraState: React.Dispatch<React.SetStateAction<boolean>>;
};

const WebcamToggleBtn: React.FC<WebcamToggleBtnProps> = ({
    cameraState,
    setCameraState,
}) => {
    return (
        <div>
            <button
                className="btn-primary"
                onClick={() => setCameraState(!cameraState)}
            >
                Turn camera {cameraState ? "OFF" : "ON"}
            </button>
        </div>
    );
};

export default WebcamToggleBtn;
