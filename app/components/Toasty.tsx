"use client";
import { Howl, Howler } from "howler";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

export const Toasty = () => {
  const soundRef = useRef<Howl | null>(null); // Keep track of the sound instance

  useEffect(() => {
    // Initialize the sound once
    if (!soundRef.current) {
      soundRef.current = new Howl({
        src: ["sounds/toasty.mp3"],
      });
    }

    const sound = soundRef.current;

    // Play the sound when the component mounts or is triggered to re-render

    setTimeout(function () {
      sound.play();
    }, 500);

    // Clean up if needed
    return () => {
      sound.stop(); // Stop the sound if component unmounts
    };
  }, []);
  return (
    <>
      <motion.div
        className="fixed bottom-3 right-0"
        initial={{ x: "100%" }}
        animate={{ x: -100, opacity: 1 }}
        transition={{
          repeat: 1,
          repeatType: "reverse",
          type: "tween",
          delay: 0.5,
          duration: 0.1,
          repeatDelay: 0.8,
        }}
        style={{ overflow: "hidden" }} // Ensure it's hidden when off-screen
      >
        <Image
          src={"/myPics/marceloSythLord3-removebg-preview.png"}
          alt="Profile Image 1"
          className="-scale-x-100"
          width={250}
          height={250}
        />
      </motion.div>
    </>
  );
};
