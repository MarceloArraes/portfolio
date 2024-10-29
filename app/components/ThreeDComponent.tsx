"use client";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import {
  Billboard,
  CameraControls,
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  SpotLight,
  Stage,
  Text,
} from "@react-three/drei";
import { Suspense, useRef } from "react";

export function ThreeDComponent() {
  const group = useRef();
  const gltf = useLoader(GLTFLoader, "./myComputer/scene.gltf");

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!group?.current?.rotation) return;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      Math.cos(t / 2) / 20 + 0.25,
      0.1
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      Math.sin(t / 4) / 20,
      0.1
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      Math.sin(t / 8) / 20,
      0.1
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      (-2 + Math.sin(t / 2)) / 2,
      0.1
    );
  });

  return (
    <Stage
      intensity={0.5}
      environment="city"
      shadows={{ type: "accumulative", bias: -0.001, intensity: Math.PI }}
      // adjustCamera={false}
      // position={[0, -1, 0]}
    >
      <Suspense fallback={null}>
        <>
          <group ref={group} rotation={[0, Math.PI, 0]} position={[0, 1, 0]}>
            <primitive object={gltf.scene} scale={1} />
            {/* <PerspectiveCamera makeDefault position={[50, 0, 90]} fov={4} /> */}
            {/* <OrbitControls autoRotate /> */}
            {/* <CameraControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.6} /> */}
            {/* <SpotLight position={[0, 2, -1]} intensity={10} angle={1.3} /> */}
            {/* <directionalLight color="yellow" intensity={2} position={[0, 0, 5]} /> */}
          </group>
          {/* <ambientLight intensity={1} /> */}
        </>
      </Suspense>

      <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2.2}
        maxPolarAngle={Math.PI / 2.2}
      />
      {/* <Environment preset="night" background /> */}
    </Stage>
  );
}
