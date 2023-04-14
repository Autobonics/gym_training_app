import Webcam from "react-webcam";
import { useEffect, useRef, LegacyRef, useState } from "react";
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

export interface WorkoutRes {
    left_counter?: number;
    right_counter?: number;
    counter?: number;
    finish: boolean;
}
export interface WorkoutArgs {
    left_limit?: number;
    right_limit?: number;
    limit?: number;
}

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
    const wrkRes = useRef<U>(props.initState);
    const [finishState, setFinish] = useState<boolean>(false);
    useEffect(() => {
        const pose = new Pose({
            locateFile: (file) =>
                `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
        });
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
                width: 1280,
                height: 720,
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
        if (results.poseLandmarks) {
            const res = props.callback(
                results.poseLandmarks,
                props.args,
                wrkRes.current
            );
            if (!res.finish) {
                wrkRes.current = res;
            } else {
                if (res.finish != finishState) {
                    setFinish(res.finish);
                }
            }
        }
    };
    return finishState ? (
        <></>
    ) : (
        <>
            <Webcam
                ref={camRef as LegacyRef<Webcam>}
                audio={false}
                mirrored={true}
                style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: "0",
                    right: "0",
                    textAlign: "center",
                    zIndex: 9,
                    width: 1280,
                    height: 720,
                }}
            />
            <canvas
                ref={canvasRef as LegacyRef<HTMLCanvasElement>}
                style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: "0",
                    right: "0",
                    textAlign: "center",
                    zIndex: 9,
                    width: 1280,
                    height: 720,
                }}
            />
        </>
    );
};
