import {
  forwardRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import {
  avatarStyles,
  avatarImageStyles,
  type AvatarSize,
  type AvatarShape,
} from "./Avatar.styles";

export type { AvatarSize, AvatarShape } from "./Avatar.styles";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Image source */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Fallback content (initials or icon) */
  fallback?: ReactNode;
  /** Size variant */
  size?: AvatarSize;
  /** Shape variant */
  shape?: AvatarShape;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      src,
      alt = "",
      fallback,
      size = "md",
      shape = "circle",
      className,
      ...props
    },
    ref,
  ) => {
    const [imgError, setImgError] = useState(false);
    const showImage = src && !imgError;

    const fallbackContent = fallback ?? (alt ? getInitials(alt) : null);

    return (
      <span
        ref={ref}
        role="img"
        aria-label={alt}
        className={avatarStyles({ size, shape, className })}
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt}
            className={avatarImageStyles()}
            onError={() => setImgError(true)}
          />
        ) : (
          fallbackContent
        )}
      </span>
    );
  },
);

Avatar.displayName = "Avatar";
