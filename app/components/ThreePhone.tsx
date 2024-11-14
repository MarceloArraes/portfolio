"use client";
import { ThreeEvent, useLoader } from "@react-three/fiber";
import { type Dispatch, type SetStateAction, useEffect, useRef } from "react";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { AdaptiveDpr, OrbitControls, Stage } from "@react-three/drei";
import { Howl, Howler } from "howler";

interface ThreePhoneProps {
  setOpenMessageForm: Dispatch<SetStateAction<boolean>>;
}

export function ThreePhone({ setOpenMessageForm }: ThreePhoneProps) {
  const soundRef = useRef<Howl | null>(null); // Keep track of the sound instance

  const gltf = useLoader(GLTFLoader, "./rotaryPhone/scene.gltf");

  useEffect(() => {
    // Initialize the sound once
    if (!soundRef.current) {
      soundRef.current = new Howl({
        src: ["sounds/matrixPlainRing1.mp3"],
      });
    }

    const sound = soundRef.current;

    return () => {
      sound.stop(); // Stop the sound if component unmounts
      setOpenMessageForm(false);
    };
  }, [setOpenMessageForm]);

  const playSound = (event: ThreeEvent<MouseEvent>) => {
    console.log("play sound ", event.delta);
    setOpenMessageForm((prev) => !prev);

    // sound.once("load", function () {
    const sound = soundRef?.current;
    if (!sound) return;
    if (sound && !sound?.playing()) {
      sound.play();
      sound.fade(0.3, 0.05, 5000);
    }
    sound.on("fade", function () {
      console.log("#Faded!!");
    });
    // sound.play();
    sound.on("end", function () {
      console.log("Finished!");
    });
  };

  return (
    <Stage
      intensity={0.5}
      environment="city"
      position={[0, 1, 0]}
      shadows={{ type: "accumulative", bias: -0.001, intensity: Math.PI }}
      adjustCamera={false}
      onClick={playSound}
      onPointerOver={playSound}
    >
      <AdaptiveDpr pixelated />
      <primitive onClick={playSound} object={gltf.scene} scale={7} />
      <OrbitControls autoRotate enablePan={false} />

      {/* <SpotLight position={[0, 2, -1]} intensity={10} angle={1.3} /> */}
      {/* <directionalLight color="yellow" intensity={2} position={[0, 0, 5]} /> */}
      <ambientLight intensity={1} />
      {/* <Environment preset="night" background /> */}
    </Stage>
  );
}
