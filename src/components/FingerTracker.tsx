import { useEffect, useRef } from "react";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";

export default function FingerTracker() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const runHandDetection = async () => {
      await tf.setBackend("webgl");
      await tf.ready();

      const model = handPoseDetection.SupportedModels.MediaPipeHands;
      const detector = await handPoseDetection.createDetector(model, {
        runtime: "tfjs",
        modelType: "lite",
      });

      const detect = async () => {
        if (videoRef.current && videoRef.current.readyState === 4) {
          const hands = await detector.estimateHands(videoRef.current);
          const ctx = canvasRef.current?.getContext("2d");

          if (ctx) {
            ctx.clearRect(0, 0, 640, 480);

            hands.forEach((hand) => {
              const kp = hand.keypoints;

              // Helper to determine finger state (up/down)
              const isFingerUp = (tipIdx: number, pipIdx: number) =>
                kp[pipIdx].y - kp[tipIdx].y > 20;

              // Reliable thumb detection: checks direction & distance
              const isThumbUp = () => {
                const dx = kp[4].x - kp[3].x;
                const dy = Math.abs(kp[4].y - kp[3].y);
                return dx > 15 && dy < 30;
              };

              const thumb = isThumbUp();
              const index = isFingerUp(8, 6);
              const middle = isFingerUp(12, 10);
              const ring = isFingerUp(16, 14);
              const pinky = isFingerUp(20, 18);

              const state = [thumb, index, middle, ring, pinky];
              console.log("🤚 Finger States:", { thumb, index, middle, ring, pinky });

              // Emoji logic based on finger combination
              let emoji = "❓";
              const combo = state.map(v => (v ? "1" : "0")).join("");

              switch (combo) {
                case "10000": emoji = "✊"; break;
                case "01000": emoji = "☝️"; break;
                case "01100": emoji = "✌️"; break;
                case "10001": emoji = "🤙"; break;
                case "10101": emoji = "🤟"; break;
                case "11111": emoji = "🖐️"; break;
              }

              // Draw emoji
                ctx.font = "48px serif";
                ctx.fillStyle = "orange";
                ctx.textAlign = "right";
                ctx.textBaseline = "bottom";
                ctx.fillText(emoji, canvasRef.current!.width - 20, canvasRef.current!.height - 20);

              // Draw landmarks
              kp.forEach((point) => {
                ctx.beginPath();
                ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
                ctx.fillStyle = "red";
                ctx.fill();
              });
            });
          }
        }

        requestAnimationFrame(detect);
      };

      detect();
    };

    runHandDetection();

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });
  }, []);


return (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#000", // black background like Apple’s page
      color: "#fff", // default white text
    }}
  >
    <div
      style={{
        position: "relative",
        width: 640,
        height: 480,
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
        border: "2px solid #333",
        backgroundColor: "#111",
      }}
    >
      {/* Overlay Text Layer */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 10,
          color: "#fff",
          fontFamily: "Helvetica Neue, sans-serif",
        }}
      >
        <h2 style={{ fontSize: "32px", margin: 0 }} className="font-sfpro font-extrabold">Live Hand Pose</h2>
        <p style={{ fontSize: "16px", marginTop: "4px", color: "#ccc" }} className="font-sfpro font-extralight">
          Detect real-time finger gestures and navigate between components.
        </p>
      </div>

      {/* Webcam Video */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        width={640}
        height={480}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          borderRadius: "20px",
        }}
      />

      {/* Canvas Layer */}
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          borderRadius: "20px",
        }}
      />
    </div>
  </div>
);
  
}