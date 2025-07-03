import React from 'react';
import { cn } from '@/lib/utils';
import '@/styles/progress-bar.css';

type ProgressBarVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error';
type ProgressBarSize = 'sm' | 'md' | 'lg';

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The current step number (1-based index) */
  currentStep: number;
  /** The total number of steps */
  totalSteps: number;
  /** Label describing the progress */
  label: string;
  /** Variant for the progress bar styling */
  variant?: ProgressBarVariant;
  /** Size of the progress bar */
  size?: ProgressBarSize;
  /** Show step numbers */
  showStepNumbers?: boolean;
  /** Show percentage */
  showPercentage?: boolean;
  /** Loading state */
  isLoading?: boolean;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Custom label class name */
  labelClassName?: string;
  /** Custom progress indicator class name */
  progressClassName?: string;
}

const variantStyles = {
  primary: {
    bg: 'bg-primary/10',
    text: 'text-primary',
    progress: 'bg-primary',
  },
  secondary: {
    bg: 'bg-secondary/10',
    text: 'text-secondary',
    progress: 'bg-secondary',
  },
  success: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    progress: 'bg-green-500',
  },
  warning: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    progress: 'bg-yellow-500',
  },
  error: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    progress: 'bg-red-500',
  },
} as const;

const sizeMap = {
  sm: {
    bar: 'progress-bar-sm',
    text: 'progress-text-xs',
  },
  md: {
    bar: 'progress-bar-md',
    text: 'progress-text-sm',
  },
  lg: {
    bar: 'progress-bar-lg',
    text: 'progress-text-base',
  },
} as const;

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(({
  currentStep,
  totalSteps,
  label,
  className,
  variant = 'primary',
  size = 'md',
  showStepNumbers = true,
  showPercentage = false,
  isLoading = false,
  animationDuration = 500,
  labelClassName,
  progressClassName,
  ...props
}, ref) => {
  // Validate props
  if (currentStep < 0 || currentStep > totalSteps) {
    console.warn(`Invalid currentStep: ${currentStep}. Must be between 0 and ${totalSteps}`);
    return null;
  }

  // Calculate the width percentage for the progress bar
  const widthPercentage = Math.min(100, Math.max(0, (currentStep / totalSteps) * 100));
  
  // Format the current step and total steps for screen readers
  const progressText = `Step ${currentStep} of ${totalSteps}: ${label}`;
  const percentageText = `${Math.round(widthPercentage)}%`;
  
  // Get styles based on variant and size
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeMap[size];

  // Create a unique class name for this instance
  const progressBarClassName = React.useMemo(() => {
    return `progress-bar-instance-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Set CSS variables in a style tag
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .${progressBarClassName} {
        --progress-width: ${widthPercentage}%;
        --transition-duration: ${animationDuration}ms;
      }
    `;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, [progressBarClassName, widthPercentage, animationDuration]);
  
  // Ensure ARIA attributes use proper number values
  const ariaProps = {
    'aria-valuenow': Number(currentStep),
    'aria-valuemin': 1,
    'aria-valuemax': Number(totalSteps),
    'aria-valuetext': progressText,
  };

  return (
    <div 
      ref={ref}
      className={cn('w-full', className)}
      role="progressbar"
      {...ariaProps}
      aria-label={progressText}
      {...props}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span 
            className={cn(
              'inline-flex items-center px-2.5 py-0.5 rounded-full font-medium',
              sizeStyle.text,
              variantStyle.bg,
              variantStyle.text,
              labelClassName
            )}
          >
            {label}
          </span>
          
          {showStepNumbers && (
            <span className={cn('font-medium text-gray-500', sizeStyle.text)}>
              {showPercentage ? percentageText : `Step ${currentStep} of ${totalSteps}`}
            </span>
          )}
        </div>
        
        <div 
          className={cn(
            'relative w-full rounded-full overflow-hidden bg-gray-200',
            sizeStyle.bar,
            'progress-bar-container'
          )}
        >
          <div
            className={cn(
              'h-full rounded-full flex items-center justify-center',
              'progress-bar-fill',
              variantStyle.progress,
              isLoading && 'animate-pulse',
              widthPercentage > 0 && 'progress-bar-min-width',
              progressClassName,
              progressBarClassName
            )}
          >
            {showPercentage && size === 'lg' && (
              <span className="text-xs font-medium text-white">
                {percentageText}
              </span>
            )}
          </div>
        </div>
        
        {isLoading && (
          <p className={cn('text-xs text-gray-500', sizeStyle.text)}>
            Saving your progress...
          </p>
        )}
      </div>
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
