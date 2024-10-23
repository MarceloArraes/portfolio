"use client";

import { useState, useEffect, useCallback } from "react";
import * as d3 from "d3";
import { WeekContribution } from "../lib/interface";
import { Card, CardTitle } from "@/components/ui/card";

interface CharacterProps {
  greenTiles: { weekIndex: number; dayIndex: number; dayCount: number }[];
  daySize: number;
  gap: number;
}

const Character = ({ greenTiles, daySize, gap }: CharacterProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0, fill: "#000080" });
  const [currentStep, setCurrentStep] = useState(0);
  const [cumulativeContributions, setCumulativeContributions] = useState(0);

  //   const contributionTone = (totalContributions: number) => {
  //     // Use d3.interpolate to create a color gradient
  //     const colorScale = d3.interpolate("#ffa938", "#ff388e");

  //     // Clamp the total contributions to a maximum of 100 for color scaling
  //     const clampedCount = Math.min(totalContributions, 100);

  //     // Calculate the ratio (0 for 0 contributions, 1 for 100 contributions)
  //     const ratio = clampedCount / 100;

  //     return colorScale(ratio);
  //   };
  const contributionTone = (totalContributions: number) => {
    // Define discrete color steps for every 10 contributions
    const colorSteps = [
      "#7FDBFF", // 0-9 contributions: light blue
      "#39CCCC", // 10-19 contributions: teal
      "#3D9970", // 20-29 contributions: green
      "#2ECC40", // 30-39 contributions: vibrant green
      "#FFDC00", // 40-49 contributions: yellow
      "#FF851B", // 50+ contributions: orange
      "#FF4136", // 60-69 contributions: red-orange
      "#FF007F", // 70-79 contributions: bright magenta
      "#B10DC9", // 80-89 contributions: purple
      "#85144b", // 90-99 contributions: dark maroon
    ];

    const stepIndex = Math.min(
      Math.floor(totalContributions % 10),
      colorSteps.length - 1
    );

    return colorSteps[stepIndex];
  };

  useEffect(() => {
    if (greenTiles.length > 0 && currentStep < greenTiles.length) {
      const { weekIndex, dayIndex, dayCount } = greenTiles[currentStep];
      setCumulativeContributions((prevCount) => prevCount + dayCount);
      setPosition({
        x: weekIndex * (daySize + gap) + daySize / 2,
        y: dayIndex * (daySize + gap) + daySize / 2,
        fill: contributionTone(dayCount),
      });

      const timer = setTimeout(() => {
        setCurrentStep((step) => step + 1);
      }, 200);

      return () => clearTimeout(timer);
    } else {
      setCurrentStep(0);
    }
  }, [currentStep, daySize, gap, greenTiles]);

  // Render the character
  return (
    <circle
      cx={position.x}
      cy={position.y}
      r={5}
      fill={contributionTone(cumulativeContributions)}
      style={{
        transition:
          "cx 0.2s ease-in-out, cy 0.2s ease-in-out, fill 0.2s ease-in-out",
      }}
    />
  );
};
interface HeatMapProps {
  data: WeekContribution[];
  total: number;
}

export const HeatMap = ({ data, total }: HeatMapProps) => {
  const [contributions, setContributions] = useState<WeekContribution[]>([]);

  useEffect(() => {
    if (data && data.length > 0) setContributions(data);
  }, [data]);

  const contributionTone = (contributionCount: number) => {
    // Clamp the contribution count to be between 0 and 10
    if (contributionCount == 0) {
      return "#1c1c1e";
    }

    const maxContributions = 10;
    const clampedCount = Math.min(contributionCount, maxContributions);

    // Use d3.interpolate to interpolate between dark green (#004d00) and bright green (#00ff00)
    const colorScale = d3.interpolate("#004d00", "#00ff00");

    // Calculate the ratio (0 for 0 contributions, 1 for 10 contributions)
    const ratio = clampedCount / maxContributions;

    // Return the color based on the ratio
    return colorScale(ratio);
  };

  const greenTiles = contributions.flatMap((week, weekIndex) =>
    week.contributionDays
      //   .filter((day) => day.contributionCount > 0)
      .map((day, dayIndex) => ({
        weekIndex,
        dayIndex,
        dayCount: day.contributionCount,
      }))
  );

  const daySize = 10;
  const gap = 2;
  const numWeeks = contributions.length;
  const numDays = contributions[0]?.contributionDays.length || 0;

  const totalWidth = numWeeks * (daySize + gap);
  const totalHeight = numDays * (daySize + gap);
  return (
    <Card className="flex flex-1 bg-slate-800 p-2 flex-col mb-2">
      <h2 className="m-1">Year Contributions: {total}</h2>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        preserveAspectRatio="xMinYMin meet"
      >
        {contributions.map((week: WeekContribution, weekIndex: number) =>
          week.contributionDays.map((day, dayIndex) => (
            <rect
              key={`${weekIndex}-${dayIndex}`}
              x={weekIndex * (daySize + gap)}
              y={dayIndex * (daySize + gap)}
              rx={3}
              ry={3}
              width={daySize}
              height={daySize}
              fill={contributionTone(day.contributionCount)}
              stroke="#2c2c2e"
            />
          ))
        )}
        <Character daySize={daySize} gap={gap} greenTiles={greenTiles} />
      </svg>
    </Card>
  );
};
