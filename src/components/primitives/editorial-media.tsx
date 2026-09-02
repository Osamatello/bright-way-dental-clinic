import Image from "next/image";
import type { ReactNode } from "react";

type EditorialMediaProps = {
  src: string;
  alt: string;
  /** Required: this component always renders a `fill` image. */
  sizes: string;
  /** Maps to next/image `preload` (Next 16 API for the LCP / above-the-fold image). */
  preload?: boolean;
  blurDataURL?: string;
  caption?: ReactNode;
  /** Adds the CSS clip-path reveal that plays once on load (no JS, no observer). */
  reveal?: boolean;
  /** `object-position` for the fill image, e.g. "50% 30%". */
  objectPosition?: string;
  /** Wrapper classes — the consumer positions / sizes the frame. */
  className?: string;
  imageClassName?: string;
  /** Optional overlay slot rendered above the image (e.g. a single scrim). */
  children?: ReactNode;
};

/*
 * Server component. One dominant image treatment for the site: a filled,
 * aspect-reserved frame with a hairline inset edge, one soft directional
 * shadow, an optional restrained caption, and an optional load reveal.
 * No clip-path polygons, no multi-corner radii, no gradient stacks.
 */
export function EditorialMedia({
  src,
  alt,
  sizes,
  preload = false,
  blurDataURL,
  caption,
  reveal = false,
  objectPosition,
  className = "",
  imageClassName = "",
  children,
}: EditorialMediaProps) {
  return (
    <figure className={`editorial-media ${className}`}>
      <span
        className="editorial-media__frame"
        data-reveal={reveal ? "media" : undefined}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL}
          className={`editorial-media__image object-cover ${imageClassName}`}
          style={objectPosition ? { objectPosition } : undefined}
        />
        {children}
      </span>
      {caption ? (
        <figcaption className="editorial-media__caption">
          <span aria-hidden="true" className="editorial-media__caption-rule" />
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
