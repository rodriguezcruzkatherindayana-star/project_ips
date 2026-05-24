import React from 'react';
import { ChevronRight, LucideIcon } from 'lucide-react';
import { cn } from './ui/utils';

interface ListItemProps {
  icon?: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  title: string;
  subtitle?: string;
  rightContent?: React.ReactNode;
  showChevron?: boolean;
  onClick?: () => void;
  className?: string;
  noBorder?: boolean;
}

export function ListItem({
  icon: Icon,
  iconColor = 'text-blue-500',
  iconBg = 'bg-blue-50',
  title,
  subtitle,
  rightContent,
  showChevron = true,
  onClick,
  className,
  noBorder = false,
}: ListItemProps) {
  const isInteractive = !!onClick;

  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-center gap-4 p-4 min-h-[64px] transition-all',
        isInteractive && 'cursor-pointer hover:bg-gray-50 active:bg-gray-100 rounded-2xl',
        !noBorder && 'border-b',
        className
      )}
      style={!noBorder ? { borderColor: 'rgba(0, 0, 0, 0.08)' } : undefined}
    >
      {/* Icon */}
      {Icon && (
        <div className={cn('w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0', iconBg)}>
          <Icon className={cn('h-5 w-5', iconColor)} />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-gray-900 font-medium leading-snug">{title}</p>
        {subtitle && (
          <p className="text-sm text-gray-600 leading-snug mt-0.5">{subtitle}</p>
        )}
      </div>

      {/* Right Content */}
      {rightContent && <div className="flex-shrink-0">{rightContent}</div>}

      {/* Chevron */}
      {showChevron && isInteractive && (
        <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
      )}
    </div>
  );
}
