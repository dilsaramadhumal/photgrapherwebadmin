import {
  Tooltip as ShadcnTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  delayDuration?: number;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  asChild?: boolean;
}

export function Tooltip({
  children,
  content,
  delayDuration = 300,
  side = "top",
  align = "center",
  asChild = true,
}: TooltipProps) {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <ShadcnTooltip>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align} className="bg-white">
          {content}
        </TooltipContent>
      </ShadcnTooltip>
    </TooltipProvider>
  );
}
