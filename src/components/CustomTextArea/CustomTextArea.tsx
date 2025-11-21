import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { forwardRef } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

type TextareaProps = React.ComponentProps<typeof Textarea>;

type TextareaFieldProps = {
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
  containerClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;

  // Callbacks
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;

  // Standalone mode (without form)
  standalone?: boolean;
  defaultValue?: string | number | readonly string[] | undefined;
} & TextareaProps;

const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  (
    {
      name,
      label,
      description,
      placeholder,
      className,
      validationSchema,
      form,
      containerClassName,
      labelClassName,
      descriptionClassName,
      errorClassName = "text-red-500",
      onChange,
      onBlur,
      onFocus,
      standalone = false,
      defaultValue = "",
      ...textareaProps
    },
    ref
  ) => {
    // For standalone mode (without form)
    if (standalone) {
      return (
        <div className={cn("grid w-full gap-1.5", containerClassName)}>
          {label && (
            <Label htmlFor={name} className={cn(labelClassName)}>
              {label}
            </Label>
          )}
          <Textarea
            id={name}
            name={name}
            placeholder={placeholder}
            className={className}
            onChange={(e) => onChange?.(e.target.value)}
            onBlur={onBlur}
            onFocus={onFocus}
            defaultValue={defaultValue}
            ref={ref}
            {...textareaProps}
          />
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
        "TextareaField must be used within a Form or with standalone prop"
      );
    }

    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field, fieldState }) => (
          <FormItem className={cn("grid w-full gap-1.5", containerClassName)}>
            {label && (
              <FormLabel className={cn(labelClassName)}>{label}</FormLabel>
            )}
            <FormControl>
              <Textarea
                placeholder={placeholder}
                className={cn(
                  fieldState.error &&
                    "border-red-500 focus-visible:ring-red-500",
                  className
                )}
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  onChange?.(e.target.value);
                }}
                onBlur={() => {
                  field.onBlur();
                  onBlur?.();
                }}
                onFocus={onFocus}
                ref={ref}
                {...textareaProps}
              />
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

TextareaField.displayName = "TextareaField";

export default TextareaField;