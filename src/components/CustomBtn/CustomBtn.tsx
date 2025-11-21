import React from "react";
import { Button } from "../ui/button";

type CustomBtnProps = {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "outline" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  color?: string;
  textColor?: string;
  text?: string;
  disabled?: boolean;
  className?: string;
};

export const CustomBtn = ({
  startIcon,
  endIcon,
  onClick,
  variant = "default",
  size = "lg",
  color,
  textColor,
  text,
  disabled,
  className,
}: CustomBtnProps) => {
  return (
    <Button
      variant={variant}
      size={size}
      className={`flex items-center justify-center rounded-md p-4 hover:bg-gray-100 dark:hover:bg-gray-800 ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={{ backgroundColor: color, color: textColor }}
    >
      {startIcon}
      {text}
      {endIcon}
    </Button>
  );
};
