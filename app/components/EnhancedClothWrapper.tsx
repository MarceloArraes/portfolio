"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// Dynamically import ClothSimulation with no SSR
const ClothSimulation = dynamic(
  () => import("react-cloth").then((mod) => mod.ClothSimulation),
  { ssr: false }
);

export const EnhancedClothWrapper = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <ClothSimulation />;
};
