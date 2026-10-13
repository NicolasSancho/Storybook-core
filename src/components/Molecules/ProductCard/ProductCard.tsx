import React from "react";
import { tv } from "tailwind-variants";
import { Image, ImageProps } from "../../Atoms/Image/Image.js";
import { Text } from "../../Atoms/Text/Text.js";

export interface ProductCardProps {
  /** Optional unique id, used as the React key when rendered in a list (falls back to `title`). */
  id?: string;
  imageUrl: string;
  title: string;
  brand: string;
  price: string;
  tag?: string;
  /**
   * Product URL. The title renders as a real link stretched over the whole card, so
   * middle-click, new tab and crawlable links work. Without it the card is display-only and the
   * title is plain text.
   */
  href?: string;
  /**
   * Component used to render the link when `href` is set. Receives `href`, `className` and
   * `children`, so a framework link (e.g. `next/link`) can be passed directly. Defaults to a
   * plain `<a>`. Define it outside the render function: an inline definition remounts the link.
   */
  LinkComponent?: React.ElementType<{
    href: string;
    children: React.ReactNode;
    className?: string;
  }>;
  /**
   * Component used to render the product image. Receives `src`, `alt`, `className` and the
   * attributes in `imageProps`, so a framework image (e.g. `next/image`) can be passed
   * directly. Defaults to a plain `<img>`. Define it outside the render function: an inline
   * definition remounts the image.
   */
  ImageComponent?: ImageProps["ImageComponent"];
  /**
   * Extra `<img>` attributes for the product image, such as `srcSet`, `sizes`, `width`,
   * `height` or `loading`. The image is decorative (`alt=""`): the title already names the card.
   */
  imageProps?: Omit<ImageProps, "src" | "alt" | "className" | "ImageComponent">;
  /**
   * Controls shown under the product info, such as an add-to-cart `<form>` with a submit
   * `Button`. They sit above the stretched link, so pressing one does its own action and does
   * not open the product, while pressing anywhere else on the card does.
   */
  actions?: React.ReactNode;
  className?: string;
}

const productCardStyles = tv({
  base: "relative rounded-lg border border-neutral-200 shadow-xs flex flex-col overflow-hidden",
  slots: {
    imageWrapper: "relative aspect-3/4",
    image: "w-full h-full object-cover",
    tag: "absolute top-2 left-2 bg-neutral-950 text-neutral-25 text-xs px-2 py-1 rounded-sm",
    body: "p-2 flex flex-col",
    productInfo: "flex flex-col",
    title: "text-sm font-medium",
    titleAction:
      "text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-hidden focus-visible:after:ring-2 focus-visible:after:ring-primary focus-visible:after:rounded-lg",
    subTitle: "text-sm text-neutral-600",
    price: "text-sm text-neutral-600",
    action: "relative z-10 mt-2",
  },
});

export const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  title,
  brand,
  price,
  tag,
  href,
  LinkComponent = "a",
  ImageComponent,
  imageProps,
  actions,
  className,
}) => {
  const styles = productCardStyles();

  return (
    <div className={styles.base({ className })}>
      <div className={styles.body()}>
        <div className={styles.imageWrapper()}>
          <Image
            src={imageUrl}
            alt=""
            ImageComponent={ImageComponent}
            className={styles.image()}
            {...imageProps}
          />
          {tag && <span className={styles.tag()}>{tag}</span>}
        </div>
        <div className={styles.productInfo()}>
          <Text as="h3" size="small" weight="semibold" className={styles.title()}>
            {href ? (
              <LinkComponent href={href} className={styles.titleAction()}>
                {title}
              </LinkComponent>
            ) : (
              title
            )}
          </Text>
          <Text as="p" size="small" color="base" className={styles.subTitle()}>
            {brand}
          </Text>
          <Text as="p" size="small" color="base" className={styles.price()}>
            {price}
          </Text>
        </div>
        {actions && <div className={styles.action()}>{actions}</div>}
      </div>
    </div>
  );
};
