import { ImageProps } from "./Image";

export const mockedImage: ImageProps = {
  src: "https://pbs.twimg.com/media/GW_WvIVXoAA3ujy.jpg",
  alt: "Placeholder Image",
  className: "w-32 h-32 rounded-lg",
};

export const smallCircleImage: ImageProps = {
  src: "https://pbs.twimg.com/media/GW_WvIVXoAA3ujy.jpg",
  alt: "Small Circle Image",
  className: "w-12 h-12 rounded-full",
};

export const largeSquareImage: ImageProps = {
  src: "https://pbs.twimg.com/media/GW_WvIVXoAA3ujy.jpg",
  alt: "Large Square Image",
  className: "w-64 h-64 rounded-none",
};
