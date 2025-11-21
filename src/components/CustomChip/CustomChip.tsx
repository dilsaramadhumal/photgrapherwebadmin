import React, { ReactNode } from 'react';
import { IoMdCloseCircle } from "react-icons/io";

export type ChipVariant = 'filled' | 'outlined';
export type ChipSize = 'sm' | 'md' | 'lg';
export type ChipColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'gray';

interface ChipProps {
  label: string;
  variant?: ChipVariant;
  size?: ChipSize;
  color?: ChipColor;
  className?: string;
  icon?: ReactNode;
  onClick?: () => void;
  onDelete?: () => void;
  disabled?: boolean;
}

const Chip: React.FC<ChipProps> = ({
  label,
  variant = 'filled',
  size = 'md',
  color = 'primary',
  className = '',
  icon,
  onClick,
  onDelete,
  disabled = false,
}) => {
  const baseClasses = 'inline-flex items-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const sizeClasses = {
    sm: 'text-xs py-1 px-2',
    md: 'text-sm py-1.5 px-3',
    lg: 'text-base py-2 px-4',
  };

  const filledColorClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
    secondary: 'bg-purple-500 text-white hover:bg-purple-600 focus:ring-purple-500',
    success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500',
    error: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500',
    info: 'bg-cyan-500 text-white hover:bg-cyan-600 focus:ring-cyan-500',
    gray: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500',
  };

  const outlinedColorClasses = {
    primary: 'border border-blue-500 text-blue-500 hover:bg-blue-50 focus:ring-blue-500',
    secondary: 'border border-purple-500 text-purple-500 hover:bg-purple-50 focus:ring-purple-500',
    success: 'border border-green-500 text-green-500 hover:bg-green-50 focus:ring-green-500',
    error: 'border border-red-500 text-red-500 hover:bg-red-50 focus:ring-red-500',
    warning: 'border border-yellow-500 text-yellow-500 hover:bg-yellow-50 focus:ring-yellow-500',
    info: 'border border-cyan-500 text-cyan-500 hover:bg-cyan-50 focus:ring-cyan-500',
    gray: 'border border-gray-500 text-gray-500 hover:bg-gray-50 focus:ring-gray-500',
  };

  const variantClasses = {
    filled: filledColorClasses[color],
    outlined: outlinedColorClasses[color],
  };

  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer';

  const iconSizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const closeButtonSizeClasses = {
    sm: 'h-3.5 w-3.5 ml-1 -mr-1',
    md: 'h-4 w-4 ml-1.5 -mr-1',
    lg: 'h-5 w-5 ml-2 -mr-1',
  };

  return (
    <span
      className={[
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        disabledClasses,
        className,
      ].join(' ')}
      onClick={!disabled ? onClick : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {icon && (
        <span className={`mr-1.5 ${iconSizeClasses[size]}`}>
          {icon}
        </span>
      )}
      {label}
      {onDelete && (
        <button
          type="button"
          className={`inline-flex items-center justify-center rounded-full hover:bg-opacity-80  ${closeButtonSizeClasses[size]}`}
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          disabled={disabled}
          aria-label={`Remove ${label}`}
        >
          <IoMdCloseCircle className={iconSizeClasses[size]} />
        </button>
      )}
    </span>
  );
};

export default Chip;