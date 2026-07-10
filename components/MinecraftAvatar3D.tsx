import React, { useEffect, useRef, useState } from "react";
import {
  SkinViewer,
  WalkingAnimation,
  IdleAnimation,
  WaveAnimation,
} from "skinview3d";

interface MinecraftAvatar3DProps {
  username: string;
  width?: number;
  height?: number;
  animation?: "idle" | "walk" | "wave";
  className?: string;
}

const MinecraftAvatar3D: React.FC<MinecraftAvatar3DProps> = ({
  username,
  width = 200,
  height = 260,
  animation = "idle",
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewerRef = useRef<SkinViewer | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const viewer = new SkinViewer({
      canvas: canvasRef.current,
      width,
      height,
      zoom: 0.85,
    });
    viewerRef.current = viewer;

    viewer.animation =
      animation === "walk" ? new WalkingAnimation() : new WaveAnimation();
    viewer.autoRotate = true;
    viewer.autoRotateSpeed = 0.8;
    viewer.controls.enableZoom = false;
    viewer.globalLight.intensity = 3;
    viewer.cameraLight.intensity = 0.6;

    viewer
      .loadSkin(`https://minotar.net/skin/${encodeURIComponent(username)}`)
      .then(() => setLoaded(true))
      .catch(() => setFailed(true));

    const handleDown = () => (viewer.autoRotate = false);
    const handleUp = () =>
      window.setTimeout(() => (viewer.autoRotate = true), 4000);
    canvasRef.current.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);

    return () => {
      canvasRef.current?.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      viewer.dispose();
    };
  }, [username]);

  return (
    <div
      className={`relative ${className}`}
      style={{ width, height }}
      title="Kéo để xoay nhân vật"
    >
      {!loaded && !failed && (
        <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-xs animate-pulse">
          Đang tải model...
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={`transition-opacity duration-500 cursor-grab active:cursor-grabbing ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
};

export default MinecraftAvatar3D;
