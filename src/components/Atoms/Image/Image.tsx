import React from "react";
import { tv } from "tailwind-variants";

export interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  // Define other props here
}

const imageStyles = tv({
  base: "h-full w-auto max-h-full object-contain",
  // Define other styles here
});

export const Image: React.FC<ImageProps> = ({ src, alt, className, ...props }) => {
  return <img src={src} alt={alt} className={`${imageStyles()} ${className}`} {...props} />;
};
