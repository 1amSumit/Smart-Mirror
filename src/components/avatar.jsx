import React, { useRef, useEffect } from "react";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import "@tensorflow/tfjs-backend-webgl";

const AvatarOverlay = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const modelRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { frameRate: { ideal: 15, max: 30 } },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    const loadModel = async () => {
      modelRef.current = await faceLandmarksDetection.createDetector(
        faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
        {
          runtime: "tfjs",
          maxFaces: 1,
        }
      );
    };

    startCamera();
    loadModel();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const drawAvatar = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (video && modelRef.current) {
      // Check if video is ready
      if (video.readyState >= 2) {
        const predictions = await modelRef.current.estimateFaces(video);
        console.log(predictions); // Log predictions to check the detected faces

        context.clearRect(0, 0, canvas.width, canvas.height);

        if (predictions.length > 0) {
          console.log("Face detected", predictions);
          const nose = predictions[0].keypoints.find(
            (point) => point.name === "noseTip"
          );
          if (nose) {
            console.log("Drawing avatar at nose:", nose);
            context.beginPath();
            context.arc(nose.x, nose.y, 50, 0, Math.PI * 2);
            context.fillStyle = "rgba(0, 255, 0, 0.5)";
            context.fill();
          }
        } else {
          console.log("No faces detected in this frame");
        }
      }
    }

    requestAnimationFrame(drawAvatar);
  };

  useEffect(() => {
    if (videoRef.current && canvasRef.current) {
      videoRef.current.onloadedmetadata = () => {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        drawAvatar();
      };
    }
  }, [videoRef, canvasRef]);

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "640px" }}>
      <video
        ref={videoRef}
        autoPlay
        style={{ width: "100%", height: "auto", display: "block" }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "auto",
        }}
      />
    </div>
  );
};

export default AvatarOverlay;
