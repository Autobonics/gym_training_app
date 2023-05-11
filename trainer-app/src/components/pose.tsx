import Webcam from "react-webcam";
import { useEffect, useRef, LegacyRef, useState, useMemo } from "react";
import { Camera } from "@mediapipe/camera_utils/camera_utils";
import {
    drawConnectors,
    drawLandmarks,
} from "@mediapipe/drawing_utils/drawing_utils";

import {
    Pose,
    InputImage,
    Results,
    ResultsListener,
    POSE_CONNECTIONS,
    LandmarkList,
} from "@mediapipe/pose";
import { Typography } from "@mui/material";

export interface WorkoutRes {
    leftCounter?: number;
    rightCounter?: number;
    counter?: number;
    finish: boolean;
}
export interface WorkoutArgs {
    left_limit?: number;
    right_limit?: number;
    limit?: number;
}

export type ResCounter =
    | { leftCounter: number; rightCounter: number }
    | { counter: number };

export type ResCallBack<T extends WorkoutArgs, U extends WorkoutRes> = (
    res: LandmarkList,
    args: T,
    curState: U
) => U;

interface PoseProp<T extends WorkoutArgs, U extends WorkoutRes> {
    callback: ResCallBack<T, U>;
    args: T;
    initState: U;
}

export const PoseProc = <T extends WorkoutArgs, U extends WorkoutRes>(
    props: PoseProp<T, U>
): JSX.Element => {
    const camRef = useRef<Webcam>();
    const canvasRef = useRef<HTMLCanvasElement>();
    const poseRef = useRef<Pose>();
    const [pose, setPose] = useState<Results>();
    const [resState, setRes] = useState<U>(props.initState);

    useEffect(() => {
        if (!pose) {
            return;
        }
        if (pose.poseLandmarks) {
            const res = props.callback(
                pose.poseLandmarks,
                props.args,
                resState
            );
            setRes(res);
        }
    }, [pose]);

    useEffect(() => {
        const pose = new Pose({
            locateFile: (file) =>
                `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
        });
        poseRef.current = pose;
        pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: true,
            smoothSegmentation: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });
        pose.onResults(onResults);
        if (camRef.current) {
            const camera = new Camera(camRef.current.video, {
                onFrame: async () => {
                    await pose.send({
                        image: camRef.current?.video as InputImage,
                    });
                },
                width: 800,
                height: 600,
            });
            camera.start();
        }
    }, []);
    const onResults: ResultsListener = (results: Results) => {
        const videoWidth = camRef.current?.video?.videoWidth;
        const videoHeight = camRef.current?.video?.videoHeight;
        if (canvasRef.current) {
            canvasRef.current.width = videoWidth as number;
            canvasRef.current.height = videoHeight as number;
        }
        const canvasElement = canvasRef.current;
        const canvasCtx = canvasElement?.getContext("2d");
        if (canvasCtx && canvasElement) {
            canvasCtx.save();
            canvasCtx.clearRect(
                0,
                0,
                videoWidth as number,
                videoHeight as number
            );
            canvasCtx.translate(videoWidth as number, 0);
            canvasCtx.scale(-1, 1);
            canvasCtx.drawImage(
                results.image,
                0,
                0,
                canvasElement.width,
                canvasElement.height
            );
            canvasCtx.globalCompositeOperation = "source-over";
            drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
                color: "#00FF00",
                lineWidth: 4,
            });
            drawLandmarks(canvasCtx, results.poseLandmarks, {
                color: "#FF0000",
                lineWidth: 2,
            });
            canvasCtx.restore();
        }
        setPose(results);
    };
    const displayCounter = (): JSX.Element => {
        if (resState) {
            if ("counter" in resState) {
                return (
                    <Typography
                        component="div"
                        variant="body1"
                        color="text.primary"
                    >
                        Counter : {resState.counter}
                    </Typography>
                );
            } else if (
                "leftCounter" in resState &&
                "rightCounter" in resState
            ) {
                return (
                    <div>
                        <Typography
                            component="div"
                            variant="body1"
                            color="text.primary"
                        >
                            LeftCounter : {resState.leftCounter}
                        </Typography>
                        <Typography
                            component="div"
                            variant="body1"
                            color="text.primary"
                        >
                            RightCounter : {resState.rightCounter}
                        </Typography>
                    </div>
                );
            }
        }
        return <div>Workout Counter</div>;
    };
    return resState?.finish ? (
        <></>
    ) : (
        <div
            style={{
                border: "1px solid white",
            }}
        >
            <div>{displayCounter()}</div>
            <Webcam
                ref={camRef as LegacyRef<Webcam>}
                audio={false}
                mirrored={true}
                style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: "0",
                    right: "0",
                    textAlign: "center",
                    width: 0,
                    height: 0,
                }}
            />
            <canvas
                ref={canvasRef as LegacyRef<HTMLCanvasElement>}
                style={{
                    margin: 3,
                    textAlign: "center",
                    width: 800,
                    height: 600,
                }}
            />
        </div>
    );
};
