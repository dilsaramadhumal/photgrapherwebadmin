import * as React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"


interface CustomPopupProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  hasScrollbar?: boolean
  className?: string
}

export function CustomPopup({
  isOpen,
  onClose,
  title,
  description,
  children,
  hasScrollbar = false,
  className = ""
}: CustomPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={`max-h-[90vh] bg-background_color rounded-lg ${hasScrollbar ? "overflow-y-auto" : "overflow-y-hidden"} ${className} xs-420:max-w-[95vw] xs-420:mx-auto  `}
      >
        <div className="relative ">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl text-text_color_blue_light xs-420:text-left">{title}</DialogTitle>
            {description && (
              <DialogDescription className="text-sm sm:text-base">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
         
        </div><hr className="h-0.5 bg-gray_lightest" />
        
        <div className={`py-4 ${hasScrollbar ? "pr-2" : ""}`}>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}