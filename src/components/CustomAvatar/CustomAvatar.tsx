import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type CustomAvatarProps = React.ComponentProps<typeof Avatar> & {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
  onClick?: () => void;
  showBadge?: boolean;
  badgeIcon?: ReactNode;
  badgeColor?: string;
  badgePosition?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  badgeSize?: "sm" | "md" | "lg";
};

const CustomAvatar = ({
  src,
  alt,
  fallback,
  className,
  onClick,
  showBadge = false,
  badgeIcon,
  badgeColor = "bg-green-500",
  badgePosition = "top-right",
  badgeSize = "md",
}: CustomAvatarProps) => {
  const positionClasses = {
    "top-right": "top-0 right-0",
    "top-left": "top-0 left-0",
    "bottom-right": "bottom-0 right-0",
    "bottom-left": "bottom-0 left-0",
  };

  const sizeClasses = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4",
  };

  return (
    <div className="relative inline-block">
      <Avatar className={cn("cursor-pointer", className)} onClick={onClick}>
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>

      {showBadge && (
        <div
          className={cn(
            "absolute rounded-full flex items-center justify-center",
            "border-2 border-white dark:border-gray-800",
            badgeColor,
            positionClasses[badgePosition],
            sizeClasses[badgeSize],
            !badgeIcon && sizeClasses[badgeSize]
          )}
        >
          {badgeIcon && (
            <div className={cn(
              badgeSize === "sm" && "scale-75",
              badgeSize === "md" && "scale-90",
              badgeSize === "lg" && "scale-100"
            )}>
              {badgeIcon}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomAvatar;