"use client";
import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense } from "react";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import {
  Environment,
  OrbitControls,
  SpotLight,
  Stage,
} from "@react-three/drei";

export function ThreePhone() {
  const gltf = useLoader(GLTFLoader, "./rotaryPhone/scene.gltf");

  return (
    <Stage
      intensity={0.5}
      environment="city"
      position={[0, 1, 0]}
      shadows={{ type: "accumulative", bias: -0.001, intensity: Math.PI }}
      adjustCamera={false}
    >
      <primitive object={gltf.scene} scale={6} />
      <OrbitControls autoRotate enablePan={false} />

      {/* <SpotLight position={[0, 2, -1]} intensity={10} angle={1.3} /> */}
      {/* <directionalLight color="yellow" intensity={2} position={[0, 0, 5]} /> */}
      <ambientLight intensity={1} />
      {/* <Environment preset="night" background /> */}
    </Stage>
  );
}
