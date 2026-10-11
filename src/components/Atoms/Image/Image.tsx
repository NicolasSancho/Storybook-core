import React from "react";
import { tv } from "tailwind-variants";

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> {
  src: string;
  /**
   * Text alternative. Use an empty string for purely decorative images, so screen readers skip them.
   */
  alt: string;
  className?: string;
  /**
   * Component used to render the image, so a framework image (e.g. `next/image`) can be passed
   * directly. Defaults to a plain `<img>`. It must accept at least `src`, `alt` and `className`,
   * which is all the type checks. Every other `<img>` attribute (`srcSet`, `sizes`, `width`,
   * `height`, `loading`...) is forwarded as well, but not checked against this component.
   * Define it outside the render function: an inline definition remounts the image.
   */
  ImageComponent?: React.ElementType<{ src: string; alt: string; className?: string }>;
}

const imageStyles = tv({
  base: "h-full w-auto max-h-full object-contain",
  // Define other styles here
});

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  className,
  ImageComponent = "img",
  ...props
}) => {
  // Widened here on purpose: the public type only guarantees `src`, `alt` and `className`,
  // while the other <img> attributes are forwarded unchecked.
  const Component: React.ElementType = ImageComponent;

  return <Component src={src} alt={alt} className={imageStyles({ className })} {...props} />;
};
