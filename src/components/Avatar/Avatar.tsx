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

const DefaultAvatarIcon = () => (
  <svg
    className="w-full h-full"
    viewBox="0 0 30 30"
    fill="none"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.0005 17C11.2245 17 8 17.5973 8 19.9893C8 22.3813 11.2041 23 15.0005 23C18.7764 23 22 22.4018 22 20.0107C22 17.6196 18.7968 17 15.0005 17Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.0004 15C17.2095 15 19 13.2087 19 10.9996C19 8.79048 17.2095 7 15.0004 7C12.7913 7 11 8.79048 11 10.9996C10.9926 13.2012 12.7714 14.9925 14.9722 15H15.0004Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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

    const isDefault = !showImage && !fallback && !alt;
    const fallbackContent =
      fallback ?? (alt ? getInitials(alt) : <DefaultAvatarIcon />);

    return (
      <span
        ref={ref}
        role="img"
        aria-label={alt || "avatar"}
        className={avatarStyles({ size, shape, isDefault, className })}
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
