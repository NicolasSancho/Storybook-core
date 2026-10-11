import { ImageProps } from "./Image";

// Self-contained placeholder illustration (inline SVG), so stories never depend on a network.
const placeholderSrc = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
    <rect width="300" height="300" fill="#f1f7fa"/>
    <circle cx="214" cy="94" r="30" fill="#90b5d2"/>
    <path d="M0 240l90-110 62 72 40-44 108 82v60H0Z" fill="#00548a"/>
  </svg>`
)}`;

export const mockedImage: ImageProps = {
  src: placeholderSrc,
  alt: "Abstract landscape illustration",
  className: "w-32 h-32 rounded-lg",
};

export const smallCircleImage: ImageProps = {
  src: placeholderSrc,
  alt: "Abstract landscape illustration",
  className: "w-12 h-12 rounded-full",
};

export const largeSquareImage: ImageProps = {
  src: placeholderSrc,
  alt: "Abstract landscape illustration",
  className: "w-64 h-64 rounded-none",
};
