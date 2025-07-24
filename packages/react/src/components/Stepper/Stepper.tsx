import React, { forwardRef, createContext, useContext, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Stepper Context
interface StepperContextValue {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
  orientation?: 'horizontal' | 'vertical';
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'simple' | 'dots';
}

const StepperContext = createContext<StepperContextValue | undefined>(undefined);

const useStepperContext = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error('Stepper components must be used within a Stepper');
  }
  return context;
};

// Stepper Container
const stepperVariants = cva(
  [],
  {
    variants: {
      orientation: {
        horizontal: 'flex items-center justify-between',
        vertical: 'flex flex-col space-y-4',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

export interface StepperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepperVariants> {
  currentStep?: number;
  onStepChange?: (step: number) => void;
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'simple' | 'dots';
}

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      currentStep: controlledStep = 1,
      onStepChange,
      orientation = 'horizontal',
      agent = 'bigSis',
      size = 'md',
      variant = 'default',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [internalStep, setInternalStep] = useState(1);
    const currentStep = controlledStep ?? internalStep;

    const setCurrentStep = (step: number) => {
      setInternalStep(step);
      onStepChange?.(step);
    };

    const totalSteps = React.Children.count(children);

    return (
      <StepperContext.Provider
        value={{
          currentStep,
          setCurrentStep,
          totalSteps,
          orientation: orientation || undefined,
          agent,
          size,
          variant,
        }}
      >
        <div
          ref={ref}
          className={cn(stepperVariants({ orientation }), className)}
          {...props}
        >
          {children}
        </div>
      </StepperContext.Provider>
    );
  }
);

Stepper.displayName = 'Stepper';

// Step Component
const stepVariants = cva(
  [
    'relative',
    'flex items-center',
    'transition-all duration-[280ms]',
  ],
  {
    variants: {
      orientation: {
        horizontal: 'flex-1',
        vertical: 'w-full',
      },
    },
  }
);

const stepIndicatorVariants = cva(
  [
    'relative z-10',
    'rounded-full',
    'border-2',
    'flex items-center justify-center',
    'font-medium',
    'transition-all duration-[280ms]',
  ],
  {
    variants: {
      size: {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-base',
      },
      state: {
        completed: 'bg-current text-black border-current',
        active: 'bg-transparent border-current',
        upcoming: 'bg-transparent border-white/30 text-gray-500',
      },
      agent: {
        bigSis: 'data-[state=completed]:bg-cyan-500 data-[state=completed]:border-cyan-500 data-[state=active]:border-cyan-500 data-[state=active]:text-cyan-400',
        bro: 'data-[state=completed]:bg-orange-500 data-[state=completed]:border-orange-500 data-[state=active]:border-orange-500 data-[state=active]:text-orange-400',
        lilSis: 'data-[state=completed]:bg-purple-500 data-[state=completed]:border-purple-500 data-[state=active]:border-purple-500 data-[state=active]:text-purple-400',
        cbo: 'data-[state=completed]:bg-green-500 data-[state=completed]:border-green-500 data-[state=active]:border-green-500 data-[state=active]:text-green-400',
      },
    },
  }
);

export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  step: number;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  clickable?: boolean;
}

export const Step = forwardRef<HTMLDivElement, StepProps>(
  (
    {
      step,
      title,
      description,
      icon,
      clickable = true,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const { currentStep, setCurrentStep, totalSteps, orientation, agent, size, variant } = useStepperContext();
    
    const state = step < currentStep ? 'completed' : step === currentStep ? 'active' : 'upcoming';
    const isLast = step === totalSteps;

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (clickable && state !== 'upcoming') {
        setCurrentStep(step);
      }
      onClick?.(e);
    };

    const agentColors = {
      bigSis: 'bg-cyan-500',
      bro: 'bg-orange-500',
      lilSis: 'bg-purple-500',
      cbo: 'bg-green-500',
    };

    return (
      <div
        ref={ref}
        className={cn(
          stepVariants({ orientation }),
          clickable && state !== 'upcoming' && 'cursor-pointer',
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <div className={cn(
          'flex items-center',
          orientation === 'vertical' && 'w-full'
        )}>
          {/* Step Indicator */}
          <div
            data-state={state}
            className={cn(stepIndicatorVariants({ size, state, agent }))}
          >
            {state === 'completed' && !icon ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            ) : icon ? (
              icon
            ) : variant === 'dots' ? (
              <div className={cn(
                'w-2 h-2 rounded-full',
                state === 'active' && agentColors[agent!],
                state === 'upcoming' && 'bg-gray-500'
              )} />
            ) : (
              step
            )}
          </div>

          {/* Step Content */}
          {(title || description) && variant !== 'dots' && (
            <div className={cn(
              'ml-3',
              orientation === 'horizontal' && 'hidden md:block'
            )}>
              {title && (
                <p className={cn(
                  'font-medium',
                  size === 'sm' && 'text-sm',
                  size === 'lg' && 'text-lg',
                  state === 'upcoming' && 'text-gray-500'
                )}>
                  {title}
                </p>
              )}
              {description && (
                <p className={cn(
                  'text-gray-500',
                  size === 'sm' && 'text-xs',
                  size === 'md' && 'text-sm',
                  size === 'lg' && 'text-base'
                )}>
                  {description}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Connector Line */}
        {!isLast && variant !== 'dots' && (
          <div
            className={cn(
              'absolute',
              'transition-all duration-[280ms]',
              orientation === 'horizontal' ? [
                'top-1/2 -translate-y-1/2',
                'left-[50%]',
                'w-full',
                'h-0.5',
              ] : [
                'left-5',
                'top-10',
                'w-0.5',
                'h-full',
              ],
              state === 'completed' ? agentColors[agent!] : 'bg-white/20'
            )}
          />
        )}

        {/* Dots variant connector */}
        {!isLast && variant === 'dots' && orientation === 'horizontal' && (
          <div className="flex-1 mx-2">
            <div className={cn(
              'h-0.5',
              'transition-all duration-[280ms]',
              state === 'completed' ? agentColors[agent!] : 'bg-white/20'
            )} />
          </div>
        )}
      </div>
    );
  }
);

Step.displayName = 'Step';

// Wizard Component (combines Stepper with content panels)
interface WizardContextValue extends StepperContextValue {
  nextStep: () => void;
  prevStep: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const WizardContext = createContext<WizardContextValue | undefined>(undefined);

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a Wizard');
  }
  return context;
};

export interface WizardProps extends StepperProps {
  onComplete?: () => void;
}

export const Wizard = forwardRef<HTMLDivElement, WizardProps>(
  (
    {
      currentStep: controlledStep = 1,
      onStepChange,
      onComplete,
      orientation = 'horizontal',
      agent = 'bigSis',
      size = 'md',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [internalStep, setInternalStep] = useState(1);
    const currentStep = controlledStep ?? internalStep;

    const steps = React.Children.toArray(children).filter(
      child => React.isValidElement(child) && child.type === WizardStep
    );
    const totalSteps = steps.length;

    const setCurrentStep = (step: number) => {
      const clampedStep = Math.max(1, Math.min(step, totalSteps));
      setInternalStep(clampedStep);
      onStepChange?.(clampedStep);
    };

    const nextStep = () => {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        onComplete?.();
      }
    };

    const prevStep = () => {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
      }
    };

    const canGoNext = currentStep < totalSteps;
    const canGoPrev = currentStep > 1;
    const isFirstStep = currentStep === 1;
    const isLastStep = currentStep === totalSteps;

    return (
      <WizardContext.Provider
        value={{
          currentStep,
          setCurrentStep,
          totalSteps,
          orientation: orientation || undefined,
          agent,
          size,
          nextStep,
          prevStep,
          canGoNext,
          canGoPrev,
          isFirstStep,
          isLastStep,
        }}
      >
        <div ref={ref} className={cn('space-y-8', className)} {...props}>
          {/* Stepper Header */}
          <Stepper
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            orientation={orientation}
            agent={agent}
            size={size}
          >
            {steps.map((step, index) => {
              const stepProps = (step as React.ReactElement).props;
              return (
                <Step
                  key={index}
                  step={index + 1}
                  title={stepProps.title}
                  description={stepProps.description}
                  icon={stepProps.icon}
                />
              );
            })}
          </Stepper>

          {/* Current Step Content */}
          <div className="mt-8">
            {steps[currentStep - 1]}
          </div>
        </div>
      </WizardContext.Provider>
    );
  }
);

Wizard.displayName = 'Wizard';

// WizardStep Component
export interface WizardStepProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export const WizardStep = forwardRef<HTMLDivElement, WizardStepProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('animate-in fade-in-0 slide-in-from-right-1/2', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

WizardStep.displayName = 'WizardStep';

// WizardActions Component
const wizardActionsVariants = cva(
  [
    'flex items-center',
    'mt-8',
  ],
  {
    variants: {
      align: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
      },
    },
    defaultVariants: {
      align: 'between',
    },
  }
);

export interface WizardActionsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof wizardActionsVariants> {}

export const WizardActions = forwardRef<HTMLDivElement, WizardActionsProps>(
  ({ align = 'between', className, children, ...props }, ref) => {
    const { 
      nextStep, 
      prevStep, 
      canGoNext, 
      canGoPrev, 
      isLastStep,
      agent = 'bigSis' 
    } = useWizard();

    const agentColors = {
      bigSis: 'bg-cyan-500 hover:bg-cyan-400',
      bro: 'bg-orange-500 hover:bg-orange-400',
      lilSis: 'bg-purple-500 hover:bg-purple-400',
      cbo: 'bg-green-500 hover:bg-green-400',
    };

    if (children) {
      return (
        <div
          ref={ref}
          className={cn(wizardActionsVariants({ align }), className)}
          {...props}
        >
          {children}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(wizardActionsVariants({ align }), className)}
        {...props}
      >
        <button
          type="button"
          onClick={prevStep}
          disabled={!canGoPrev}
          className={cn(
            'px-4 py-2',
            'rounded-lg',
            'font-medium',
            'transition-all duration-[280ms]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            canGoPrev 
              ? 'bg-white/10 hover:bg-white/20 border border-white/20'
              : 'bg-transparent border border-transparent'
          )}
        >
          Previous
        </button>

        <button
          type="button"
          onClick={nextStep}
          disabled={!canGoNext && !isLastStep}
          className={cn(
            'px-4 py-2',
            'rounded-lg',
            'font-medium',
            'text-white',
            'transition-all duration-[280ms]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            agentColors[agent]
          )}
        >
          {isLastStep ? 'Complete' : 'Next'}
        </button>
      </div>
    );
  }
);

WizardActions.displayName = 'WizardActions';