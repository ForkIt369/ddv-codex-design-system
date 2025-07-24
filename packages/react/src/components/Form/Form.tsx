import React, { forwardRef, createContext, useContext } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Form Context
interface FormContextValue {
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
  size?: 'sm' | 'md' | 'lg';
  layout?: 'vertical' | 'horizontal' | 'inline';
  disabled?: boolean;
}

const FormContext = createContext<FormContextValue>({});

const useFormContext = () => useContext(FormContext);

// Form Container
export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
  size?: 'sm' | 'md' | 'lg';
  layout?: 'vertical' | 'horizontal' | 'inline';
  disabled?: boolean;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(
  (
    {
      agent = 'bigSis',
      size = 'md',
      layout = 'vertical',
      disabled = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <FormContext.Provider value={{ agent, size, layout, disabled }}>
        <form
          ref={ref}
          className={cn(
            layout === 'inline' && 'flex flex-wrap items-end gap-4',
            className
          )}
          {...props}
        >
          {children}
        </form>
      </FormContext.Provider>
    );
  }
);

Form.displayName = 'Form';

// Form Field
const formFieldVariants = cva(
  [],
  {
    variants: {
      layout: {
        vertical: 'flex flex-col',
        horizontal: 'grid grid-cols-3 gap-4 items-center',
        inline: 'flex items-center gap-2',
      },
      spacing: {
        sm: 'mb-3',
        md: 'mb-4',
        lg: 'mb-6',
      },
    },
    defaultVariants: {
      layout: 'vertical',
      spacing: 'md',
    },
  }
);

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  spacing?: 'sm' | 'md' | 'lg';
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      name,
      label,
      description,
      error,
      required = false,
      spacing = 'md',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { layout } = useFormContext();

    const labelElement = label && (
      <FormLabel htmlFor={name} required={required}>
        {label}
      </FormLabel>
    );

    const fieldContent = (
      <>
        {children}
        {description && !error && (
          <FormDescription>{description}</FormDescription>
        )}
        {error && <FormError>{error}</FormError>}
      </>
    );

    if (layout === 'horizontal') {
      return (
        <div
          ref={ref}
          className={cn(formFieldVariants({ layout, spacing }), className)}
          {...props}
        >
          {labelElement}
          <div className="col-span-2">
            {fieldContent}
          </div>
        </div>
      );
    }

    if (layout === 'inline') {
      return (
        <div
          ref={ref}
          className={cn(formFieldVariants({ layout, spacing }), className)}
          {...props}
        >
          {labelElement}
          {children}
          {error && <FormError>{error}</FormError>}
        </div>
      );
    }

    // Vertical layout (default)
    return (
      <div
        ref={ref}
        className={cn(formFieldVariants({ layout, spacing }), className)}
        {...props}
      >
        {labelElement}
        {fieldContent}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

// Form Label
const formLabelVariants = cva(
  [
    'font-medium',
    'text-gray-300',
  ],
  {
    variants: {
      size: {
        sm: 'text-xs mb-1',
        md: 'text-sm mb-1.5',
        lg: 'text-base mb-2',
      },
      required: {
        true: "after:content-['*'] after:ml-0.5 after:text-red-500",
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      required: false,
    },
  }
);

export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, required = false, children, ...props }, ref) => {
    const { size } = useFormContext();

    return (
      <label
        ref={ref}
        className={cn(formLabelVariants({ size, required }), className)}
        {...props}
      >
        {children}
      </label>
    );
  }
);

FormLabel.displayName = 'FormLabel';

// Form Description
export interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FormDescription = forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { size } = useFormContext();

    return (
      <p
        ref={ref}
        className={cn(
          'text-gray-500',
          size === 'sm' && 'text-xs mt-1',
          size === 'md' && 'text-sm mt-1.5',
          size === 'lg' && 'text-base mt-2',
          className
        )}
        {...props}
      />
    );
  }
);

FormDescription.displayName = 'FormDescription';

// Form Error
export interface FormErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FormError = forwardRef<HTMLParagraphElement, FormErrorProps>(
  ({ className, ...props }, ref) => {
    const { size } = useFormContext();

    return (
      <p
        ref={ref}
        role="alert"
        className={cn(
          'text-red-400',
          size === 'sm' && 'text-xs mt-1',
          size === 'md' && 'text-sm mt-1.5',
          size === 'lg' && 'text-base mt-2',
          className
        )}
        {...props}
      />
    );
  }
);

FormError.displayName = 'FormError';

// Form Section
export interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

export const FormSection = forwardRef<HTMLDivElement, FormSectionProps>(
  ({ title, description, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('space-y-4 mb-8', className)}
        {...props}
      >
        {(title || description) && (
          <div className="mb-4">
            {title && (
              <h3 className="text-lg font-semibold text-gray-100 mb-1">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-gray-500">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    );
  }
);

FormSection.displayName = 'FormSection';

// Form Actions
const formActionsVariants = cva(
  [
    'flex items-center',
    'pt-4',
  ],
  {
    variants: {
      align: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
      },
      spacing: {
        sm: 'gap-2',
        md: 'gap-3',
        lg: 'gap-4',
      },
    },
    defaultVariants: {
      align: 'end',
      spacing: 'md',
    },
  }
);

export interface FormActionsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formActionsVariants> {}

export const FormActions = forwardRef<HTMLDivElement, FormActionsProps>(
  ({ className, align = 'end', spacing = 'md', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(formActionsVariants({ align, spacing }), className)}
        {...props}
      />
    );
  }
);

FormActions.displayName = 'FormActions';

// Form Group (for inline fields)
export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4;
}

export const FormGroup = forwardRef<HTMLDivElement, FormGroupProps>(
  ({ cols = 2, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid gap-4',
          cols === 1 && 'grid-cols-1',
          cols === 2 && 'grid-cols-1 md:grid-cols-2',
          cols === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
          cols === 4 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
          className
        )}
        {...props}
      />
    );
  }
);

FormGroup.displayName = 'FormGroup';