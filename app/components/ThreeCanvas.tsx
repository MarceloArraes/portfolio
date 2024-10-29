"use client";
import { Canvas } from "@react-three/fiber";
import { ReactNode, Suspense } from "react";

export const ThreeCanvas = ({ children }: { children: ReactNode }) => {
  return (
    <Canvas
      //   camera={{ position: [-5, 0, -15], fov: 55 }}
      camera={{ position: [0, 50, 150], fov: 4 }}
      style={{ height: "100%", width: "100%" }}
    >
      {children}
    </Canvas>
  );
};
