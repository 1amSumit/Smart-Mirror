import React, { useEffect, useRef, useState } from "react";
import * as bodyPix from "@tensorflow-models/body-pix";
import "@tensorflow/tfjs";

const LiveAvatar = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setupCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
    };

    const loadBodyPixModel = async () => {
      const net = await bodyPix.load({
        architecture: "MobileNetV1",
        outputStride: 16,
        multiplier: 0.75,
        quantBytes: 2,
      });
      setLoading(false);
      return net;
    };

    const startAvatarEffect = async () => {
      const net = await loadBodyPixModel();
      const canvas = canvasRef.current;
      const video = videoRef.current;

      const drawAvatar = async () => {
        const segmentation = await net.segmentPerson(video, {
          internalResolution: "high",
          segmentationThreshold: 0.75,
          maxDetections: 1,
          scoreThreshold: 0.3,
        });

        const ctx = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw image onto canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Get image data and remove background
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const { data } = imageData;

        for (let i = 0; i < data.length; i += 4) {
          if (segmentation.data[i / 4] === 0) {
            data[i + 3] = 0; // Set alpha to 0 for background pixels
          }
        }

        ctx.putImageData(imageData, 0, 0);

        // Apply circular mask to create an avatar shape
        ctx.globalCompositeOperation = "destination-in";
        ctx.beginPath();
        ctx.arc(
          canvas.width / 2,
          canvas.height / 2,
          Math.min(canvas.width, canvas.height) / 2,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";

        // Apply cartoon filter effect
        ctx.filter = "contrast(1.2) brightness(1.1) saturate(1.2)";

        requestAnimationFrame(drawAvatar);
      };

      drawAvatar();
    };

    setupCamera().then(() => startAvatarEffect());
  }, []);

  return (
    <div style={styles.container}>
      {loading && <p>Loading model...</p>}
      <video ref={videoRef} style={{ display: "none" }} />
      <canvas ref={canvasRef} style={styles.canvas} />
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  canvas: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "50%",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
  },
};

export default LiveAvatar;
