import * as React from "react";
import { format, parseISO } from "date-fns";
import { UseFormReturn } from "react-hook-form";
import { forwardRef, ElementType, ReactElement, ReactNode } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type DatePickerProps = {
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  form?: UseFormReturn<any> | any;
  prefix?: ReactNode | ReactElement<ElementType> | string | any;
  suffix?: ReactNode | ReactElement<ElementType> | string | any;
  containerClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
  buttonClassName?: string;
  calendarClassName?: string;
  popoverClassName?: string;
  disabled?: (date: Date) => boolean;
  fromDate?: Date;
  toDate?: Date;
  onChange?: (value: string | undefined) => void;
  onFocus?: () => void;
  standalone?: boolean;
  defaultValue?: string | undefined;
  value?: string | undefined | null;
  dateFormat?: string;
};

const DatePickerField = forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      name,
      label,
      description,
      placeholder = "Pick a date",
      form,
      prefix,
      suffix,
      containerClassName,
      labelClassName,
      descriptionClassName,
      errorClassName = "text-red-500",
      buttonClassName,
      calendarClassName,
      popoverClassName,
      disabled,
      fromDate,
      toDate,
      onChange,
      onFocus,
      standalone = false,
      defaultValue = new Date().toISOString().split("T")[0],
      value,
      dateFormat = "yyyy-MM-dd",
    },
    ref
  ) => {
    const formatDateString = (dateString?: string) => {
      if (!dateString) return undefined;
      try {
        return parseISO(dateString);
      } catch {
        return undefined;
      }
    };

    const dateToString = (date?: Date) => {
      if (!date) return undefined;
      return format(date, dateFormat);
    };

    // For standalone mode (without form)
    if (standalone) {
      const [internalValue, setInternalValue] = React.useState<
        string | undefined
      >(value || defaultValue);
      const dateValue = formatDateString(internalValue);

      const handleDateChange = (date: Date | undefined) => {
        const dateString = dateToString(date);
        setInternalValue(dateString);
        onChange?.(dateString);
      };

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
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                data-empty={!dateValue}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  buttonClassName,
                  !dateValue && "text-muted-foreground"
                )}
                onFocus={onFocus}
                ref={ref}
              >
                {prefix && <span className="mr-2">{prefix}</span>}
                {dateValue ? (
                  format(dateValue, "PPP")
                ) : (
                  <span>{placeholder}</span>
                )}
                {suffix && <span className="ml-2">{suffix}</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className={cn("w-auto p-0 bg-white", popoverClassName)}
            >
              <Calendar
                mode="single"
                selected={dateValue}
                onSelect={handleDateChange}
                disabled={disabled}
                fromDate={fromDate}
                toDate={toDate}
                className={calendarClassName}
              />
            </PopoverContent>
          </Popover>
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
        "DatePickerField must be used within a Form or with standalone prop"
      );
    }

    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field, fieldState }) => {
          const dateValue = formatDateString(field.value);

          return (
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
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      data-empty={!dateValue}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        buttonClassName,
                        !dateValue && "text-muted-foreground",
                        fieldState.error &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                      onFocus={onFocus}
                      ref={ref}
                    >
                      {prefix && <span className="mr-2">{prefix}</span>}
                      {dateValue ? (
                        format(dateValue, "PPP")
                      ) : (
                        <span>{placeholder}</span>
                      )}
                      {suffix && <span className="ml-2">{suffix}</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className={cn("w-auto p-0 bg-white", popoverClassName)}
                  >
                    <Calendar
                      mode="single"
                      selected={dateValue}
                      onSelect={(date) => {
                        const dateString = dateToString(date);
                        field.onChange(dateString);
                        onChange?.(dateString);
                      }}
                      disabled={disabled}
                      fromDate={fromDate}
                      toDate={toDate}
                      className={calendarClassName}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              {description && !fieldState.error && (
                <FormDescription
                  className={cn("text-sm", descriptionClassName)}
                >
                  {description}
                </FormDescription>
              )}
              <FormMessage className={cn("text-sm", errorClassName)} />
            </FormItem>
          );
        }}
      />
    );
  }
);

DatePickerField.displayName = "DatePickerField";

export default DatePickerField;