import { UseFormReturn, useFormContext } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type BaseSelectProps = Omit<React.ComponentProps<typeof Select>, "form">;

type SelectFieldProps = BaseSelectProps & {
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  className?: string;
  options?: SelectOption[];
  groups?: {
    label: string;
    options: SelectOption[];
  }[];
  validationSchema?: z.ZodType<any, any>;
  rhfForm?: UseFormReturn<any>;
  prefix?: ReactNode | ReactElement<ElementType> | string | any;
  suffix?: ReactNode | ReactElement<ElementType> | string | any;
  containerClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onOpenChange?: (open: boolean) => void;
  standalone?: boolean;
  defaultValue?: string;
  value?: string;
};

const SelectField = forwardRef<HTMLButtonElement, SelectFieldProps>(
  (props, ref) => {
    const contextForm = useFormContext();
    const form = props.rhfForm || contextForm;

    if (props.standalone) {
      const {
        name,
        label,
        description,
        placeholder,
        className,
        options,
        groups,
        prefix,
        suffix,
        containerClassName,
        labelClassName,
        descriptionClassName,
        errorClassName = "text-red-500",
        triggerClassName,
        contentClassName = "bg-white",
        onChange,
        onBlur,
        onFocus,
        onOpenChange,
        defaultValue = "",
        value,
        ...selectProps
      } = props;

      if (!options?.length && !groups?.length) {
        throw new Error("SelectField requires either options or groups prop");
      }

      return (
        <div className={cn("space-y-2", containerClassName)}>
          {label && (
            <label htmlFor={name} className={cn("text-sm font-medium leading-none", labelClassName)}>
              {label}
            </label>
          )}
          <Select
            onValueChange={onChange}
            onOpenChange={onOpenChange}
            defaultValue={defaultValue}
            value={value}
            {...selectProps}
          >
            <SelectTrigger
              className={cn("w-full", className, triggerClassName)}
              ref={ref}
              onFocus={onFocus}
              onBlur={onBlur}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className={cn(
              "bg-popover text-popover-foreground",
              "border border-border rounded-md shadow-lg",
              "p-1",
              contentClassName
            )}>
              {groups ? (
                groups.map((group, index) => (
                  <SelectGroup key={index}>
                    <SelectLabel className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
                      {group.label}
                    </SelectLabel>
                    {group.options.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                        className={cn(
                          "bg-popover hover:bg-accent hover:text-accent-foreground",
                          "focus:bg-accent focus:text-accent-foreground",
                          "data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground",
                          "rounded-sm m-1"
                        )}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))
              ) : (
                <SelectGroup>
                  {options?.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                      className={cn(
                        "bg-popover hover:bg-accent hover:text-accent-foreground",
                        "focus:bg-accent focus:text-accent-foreground",
                        "data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground",
                        "rounded-sm m-1"
                      )}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              )}
            </SelectContent>
          </Select>
          {description && (
            <p className={cn("text-sm text-muted-foreground", descriptionClassName)}>
              {description}
            </p>
          )}
        </div>
      );
    }

    if (!form) {
      throw new Error(
        "SelectField must be used within a Form component or have rhfForm provided"
      );
    }

    const {
      name,
      label,
      description,
      placeholder,
      className,
      options,
      groups,
      prefix,
      suffix,
      containerClassName,
      labelClassName,
      descriptionClassName,
      errorClassName = "text-red-500",
      triggerClassName,
      contentClassName = "bg-white",
      onChange,
      onBlur,
      onFocus,
      onOpenChange,
      defaultValue = "",
      value,
      ...selectProps
    } = props;

    if (!options?.length && !groups?.length) {
      throw new Error("SelectField requires either options or groups prop");
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
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                onChange?.(value);
              }}
              onOpenChange={onOpenChange}
              defaultValue={field.value}
              {...selectProps}
            >
              <FormControl>
                <SelectTrigger
                  className={cn(
                    "w-full",
                    className,
                    fieldState.error && "border-destructive focus:ring-destructive",
                    triggerClassName
                  )}
                  onFocus={onFocus}
                  onBlur={() => {
                    field.onBlur();
                    onBlur?.();
                  }}
                  ref={ref}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className={cn(
                "bg-popover text-popover-foreground",
                "border border-border rounded-md shadow-lg",
                "p-1",
                contentClassName
              )}>
                {groups ? (
                  groups.map((group, index) => (
                    <SelectGroup key={index}>
                      <SelectLabel className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
                        {group.label}
                      </SelectLabel>
                      {group.options.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          disabled={option.disabled}
                          className={cn(
                            "bg-popover hover:bg-accent hover:text-accent-foreground",
                            "focus:bg-accent focus:text-accent-foreground",
                            "data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground",
                            "rounded-sm m-1",
                          )}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))
                ) : (
                  <SelectGroup>
                    {options?.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                        className={cn(
                          "bg-popover hover:bg-accent hover:text-accent-foreground",
                          "focus:bg-accent focus:text-accent-foreground",
                          "data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground",
                          "rounded-sm m-1"
                        )}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                )}
              </SelectContent>
            </Select>
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

SelectField.displayName = "SelectField";

export default SelectField;