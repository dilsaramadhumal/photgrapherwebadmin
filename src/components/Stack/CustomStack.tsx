import React, { ReactNode } from "react";

type Direction = "vertical" | "horizontal";
type Align = "start" | "center" | "end" | "stretch" | "baseline";
type Justify = "start" | "center" | "end" | "between" | "around" | "evenly";
type Spacing =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 14
  | 16
  | 20
  | 24
  | 28
  | 32
  | 36
  | 40
  | 44
  | 48
  | 52
  | 56
  | 60
  | 64
  | 72
  | 80
  | 96;

interface StackProps {
  children: ReactNode;
  direction?: Direction;
  spacing?: Spacing;
  align?: Align;
  justify?: Justify;
  wrap?: boolean;
  className?: string;
  [key: string]: any; 
}

const Stack: React.FC<StackProps> = ({
  children,
  direction = "vertical",
  spacing = 4,
  align = "start",
  justify = "start",
  wrap = false,
  className = "",
  ...props
}) => {
  const directionClasses = {
    vertical: "flex flex-col",
    horizontal: "flex flex-row",
  };

  const spacingClasses = {
    vertical: `space-y-${spacing}`,
    horizontal: `space-x-${spacing}`,
  };

  const alignClasses: Record<Align, string> = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
    baseline: "items-baseline",
  };

  const justifyClasses: Record<Justify, string> = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  };

  return (
    <div
      className={`
        ${directionClasses[direction]}
        ${spacingClasses[direction]}
        ${alignClasses[align]}
        ${justifyClasses[justify]}
        ${wrap ? "flex-wrap" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Stack;
