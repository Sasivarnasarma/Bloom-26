import { useState } from "react";
import { cn } from "../../utils/cn";

interface ImageWithPlaceholderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
}

export function ImageWithPlaceholder({
  src,
  alt,
  className,
  wrapperClassName,
  ...props
}: ImageWithPlaceholderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("relative h-full w-full overflow-hidden", wrapperClassName)}>
      {/* Pulse Skeleton Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-linear-to-br from-bloom-ink/10 to-bloom-ink/5" />
      )}

      {/* Core Image element */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "transition-opacity duration-500 ease-in-out",
          isLoaded ? "opacity-100" : "opacity-0 absolute",
          className,
        )}
        {...props}
      />
    </div>
  );
}
