import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { ReactNode, forwardRef, ElementType, ReactElement } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type NumberInputProps = {
  // Basic props
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  className?: string;

  // Validation
  validationSchema?: z.ZodType<any, any>;

  // Form integration
  form?: UseFormReturn<any> | any;

  // Customization
  prefix?: ReactNode | ReactElement<ElementType> | string | any;
  suffix?: ReactNode | ReactElement<ElementType> | string | any;
  containerClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;

  // Number options
  min?: number;
  max?: number;
  step?: number | string;

  // Callbacks
  onChange?: (value: number) => void;
  onBlur?: () => void;
  onFocus?: () => void;

  // Standalone mode (without form)
  standalone?: boolean;
  defaultValue?: number | string;
} & React.ComponentProps<typeof Input>;

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
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
      min,
      max,
      step = "any",
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
            <label
              htmlFor={name}
              className={cn("text-sm font-medium leading-none", labelClassName)}
            >
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
              type="number"
              id={name}
              name={name}
              placeholder={placeholder}
              min={min}
              max={max}
              step={step}
              className={cn(
                prefix ? "pl-10" : "",
                suffix ? "pr-10" : "",
                "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                className
              )}
              onChange={(e) => onChange?.(parseFloat(e.target.value))}
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
            <p
              className={cn(
                "text-sm text-muted-foreground",
                descriptionClassName
              )}
            >
              {description}
            </p>
          )}
        </div>
      );
    }

    // For form mode
    if (!form) {
      throw new Error(
        "NumberInput must be used within a Form or with standalone prop"
      );
    }

    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field, fieldState }) => (
          <FormItem className={cn("space-y-2", containerClassName)}>
            {label && (
              <FormLabel
                className={cn(
                  "text-sm font-medium leading-none",
                  labelClassName
                )}
              >
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
                  type="number"
                  placeholder={placeholder}
                  min={min}
                  max={max}
                  step={step}
                  className={cn(
                    prefix ? "pl-10" : "",
                    suffix ? "pr-10" : "",
                    "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                    fieldState.error &&
                      "border-red-500 focus-visible:ring-red-500",
                    className
                  )}
                  {...field}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    field.onChange(isNaN(value) ? "" : value);
                    onChange?.(value);
                  }}
                  onBlur={() => {
                    field.onBlur();
                    onBlur?.();
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
    );
  }
);

NumberInput.displayName = "NumberInput";

export default NumberInput;