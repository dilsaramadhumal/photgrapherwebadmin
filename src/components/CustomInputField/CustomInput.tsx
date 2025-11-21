import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { ReactNode, forwardRef, ElementType, ReactElement } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type InputProps = React.ComponentProps<typeof Input>

type InputFieldProps = {
  // Basic props
  name: string
  label?: string
  description?: string
  placeholder?: string
  className?: string
  
  // Validation
  validationSchema?: z.ZodType<any, any>
  
  // Form integration
  form?: UseFormReturn<any> | any
  
  // Customization
  prefix?: ReactNode | ReactElement<ElementType> | string | any
  suffix?: ReactNode | ReactElement<ElementType> | string | any
  containerClassName?: string
  labelClassName?: string
  descriptionClassName?: string
  errorClassName?: string
  
  // Callbacks
  onChange?: (value: string) => void
  onBlur?: () => void
  onFocus?: () => void
  
  // Standalone mode (without form)
  standalone?: boolean
  defaultValue?: string | number | readonly string[] | undefined
} & InputProps

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      name,
      label,
      description,
      placeholder,
      className,
      validationSchema,
      form,
      prefix,
      suffix,
      containerClassName,
      labelClassName,
      descriptionClassName,
      errorClassName = "text-red-500",
      onChange,
      onBlur,
      onFocus,
      standalone = false,
      defaultValue = "",
      ...inputProps
    },
    ref
  ) => {
    // For standalone mode (without form)
    if (standalone) {
      return (
        <div className={cn("space-y-2", containerClassName)}>
          {label && (
            <label htmlFor={name} className={cn("text-sm font-medium leading-none", labelClassName)}>
              {label}
            </label>
          )}
          <div className="relative flex items-center">
            {prefix && (
              <div className="absolute left-3 flex items-center justify-center">
                {prefix}
              </div>
            )}
            <Input
              id={name}
              name={name}
              placeholder={placeholder}
              className={cn(
                prefix ? "pl-10" : "",
                suffix ? "pr-10" : "",
                className
              )}
              onChange={(e) => onChange?.(e.target.value)}
              onBlur={onBlur}
              onFocus={onFocus}
              defaultValue={defaultValue}
              ref={ref}
              {...inputProps}
            />
            {suffix && (
              <div className="absolute right-3 flex items-center justify-center">
                {suffix}
              </div>
            )}
          </div>
          {description && (
            <p className={cn("text-sm text-muted-foreground", descriptionClassName)}>
              {description}
            </p>
          )}
        </div>
      )
    }

    // For form mode
    if (!form) {
      throw new Error("InputField must be used within a Form or with standalone prop")
    }

    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field, fieldState }) => (
          <FormItem className={cn("space-y-2", containerClassName)}>
            {label && (
              <FormLabel className={cn("text-sm font-medium leading-none", labelClassName)}>
                {label}
              </FormLabel>
            )}
            <FormControl>
              <div className="relative flex items-center">
                {prefix && (
                  <div className="absolute left-3 flex items-center justify-center">
                    {prefix}
                  </div>
                )}
                <Input
                  placeholder={placeholder}
                  className={cn(
                    prefix ? "pl-10" : "",
                    suffix ? "pr-10" : "",
                    fieldState.error && "border-red-500 focus-visible:ring-red-500",
                    className
                  )}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    onChange?.(e.target.value)
                  }}
                  onBlur={() => {
                    field.onBlur()
                    onBlur?.()
                  }}
                  onFocus={onFocus}
                  ref={ref}
                  {...inputProps}
                />
                {suffix && (
                  <div className="absolute right-3 flex items-center justify-center">
                    {suffix}
                  </div>
                )}
              </div>
            </FormControl>
            {description && !fieldState.error && (
              <FormDescription className={cn("text-sm", descriptionClassName)}>
                {description}
              </FormDescription>
            )}
            <FormMessage className={cn("text-sm", errorClassName)} />
          </FormItem>
        )}
      />
    )
  }
)

InputField.displayName = "InputField"

export default InputField