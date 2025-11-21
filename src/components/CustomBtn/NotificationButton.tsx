import { Button } from "../ui/button";
import { MdNotificationsNone } from "react-icons/md";
import { cn } from "@/lib/utils";

type NotificationButtonProps = {
  onClick: () => void;
  size?: "default" | "sm" | "lg" | "icon";
  iconSize?: number;
  showBadge?: boolean;
  badgeContent?: number;
  badgeVariant?: "number" | "dot";
  badgeColor?: string;
  className?: string;
  badgeClassName?: string;
  badgeOffset?: { x?: string; y?: string };
  style?: React.CSSProperties;
};

const NotificationButton = ({
  onClick,
  size = "lg",
  iconSize = 24,
  showBadge = false,
  badgeContent = 0,
  badgeVariant = "number",
  badgeColor = "bg-red-500 text-white",
  className,
  badgeClassName,
  badgeOffset = { x: "25%", y: "-25%" },
  style,
}: NotificationButtonProps) => {
  const displayBadgeContent = 
    badgeVariant === "number" 
      ? badgeContent > 99 
        ? "99+" 
        : badgeContent
      : null;

  return (
    <Button 
      variant="ghost" 
      size={size} 
      onClick={onClick}
      className={cn("relative", className)}
      style={style}
    >
      <div className="relative">
        <MdNotificationsNone style={{ width: iconSize, height: iconSize }} />
        {showBadge && (
          <span
            className={cn(
              "absolute top-0 right-0",
              "rounded-full flex items-center justify-center",
              badgeVariant === "number" ? "min-w-5 h-5 text-xs px-1" : "w-2 h-2",
              badgeColor,
              badgeClassName
            )}
            style={{
              transform: `translate(${badgeOffset.x}, ${badgeOffset.y})`,
            }}
          >
            {displayBadgeContent}
          </span>
        )}
      </div>
    </Button>
  );
};

export default NotificationButton;