import clsx from 'clsx';
import { Props } from 'models/common.model';

export interface FormFieldProps {
  isError?: boolean;
  error?: string;
  className?: string;
}

export function FormField({
  children,
  className,
  isError,
  error,
}: Props<FormFieldProps>) {
  return (
    <fieldset className={clsx('flex flex-col', className)}>
      {children}
      {isError && <p className='text-red-500 text-xs'>{error}</p>}
    </fieldset>
  );
}
