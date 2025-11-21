import { toast } from "sonner"
import { ReactNode } from "react"
import { CheckCircle2, AlertCircle, Info, XCircle, Loader2 } from "lucide-react"

type ToastVariant = "success" | "error" | "warning" | "info" | "loading" | "default"

type ToastProps = {
  variant?: ToastVariant
  title: string
  description?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

const variantStyles: Record<ToastVariant, string> = {
  success: "bg-green-50 border-green-500 text-green-700",
  error: "bg-red-50 border-red-500 text-red-700",
  warning: "bg-yellow-50 border-yellow-500 text-yellow-700",
  info: "bg-blue-50 border-blue-500 text-blue-700",
  loading: "bg-gray-50 border-gray-500 text-gray-700",
  default: "bg-white border-gray-300 text-gray-900",
}

const variantIcons: Record<ToastVariant, ReactNode> = {
  success: <CheckCircle2 className="h-5 w-5 text-green-600" />,
  error: <XCircle className="h-5 w-5 text-red-600" />,
  warning: <AlertCircle className="h-5 w-5 text-yellow-600" />,
  info: <Info className="h-5 w-5 text-blue-600" />,
  loading: <Loader2 className="h-5 w-5 text-gray-600 animate-spin" />,
  default: null,
}

export const showToast = ({
  variant = "default",
  title,
  description,
  duration = 5000,
  action,
}: ToastProps) => {
  return toast.custom((t) => (
    <div
      className={`${variantStyles[variant]} flex items-start gap-3 rounded-lg border p-4 shadow-lg transition-all duration-300 ${t ? "animate-in slide-in-from-bottom-2" : "animate-out fade-out-80"}`}
    >
      {variantIcons[variant]}
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        {description && <p className="mt-1 text-sm opacity-90">{description}</p>}
      </div>
      {action && (
        <button
          onClick={() => {
            action.onClick()
            toast.dismiss(t)
          }}
          className={`ml-4 text-sm font-medium ${
            variant === "default" 
              ? "text-gray-900 hover:text-gray-700" 
              : variant === "success"
                ? "text-green-700 hover:text-green-600"
                : variant === "error"
                  ? "text-red-700 hover:text-red-600"
                  : variant === "warning"
                    ? "text-yellow-700 hover:text-yellow-600"
                    : "text-blue-700 hover:text-blue-600"
          }`}
        >
          {action.label}
        </button>
      )}
      <button
        onClick={() => toast.dismiss(t)}
        className="ml-2 rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  ), { duration })
}
export const toastSuccess = (title: string, description?: string) => 
  showToast({ variant: "success", title, description })

export const toastError = (title: string, description?: string) => 
  showToast({ variant: "error", title, description })

export const toastWarning = (title: string, description?: string) => 
  showToast({ variant: "warning", title, description })

export const toastInfo = (title: string, description?: string) => 
  showToast({ variant: "info", title, description })

export const toastLoading = (title: string, description?: string) => 
  showToast({ variant: "loading", title, description })