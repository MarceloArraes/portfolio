import React from "react";

interface VideoProps {
  src: string;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
}

export const Video: React.FC<VideoProps> = ({
  src,
  controls = true,
  autoPlay = false,
  loop = false,
  muted = false,
  className = "",
}) => {
  return (
    <div className={`video-container ${className}`}>
      <video
        src={src}
        controls={controls}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        className="w-full h-auto rounded-lg"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
