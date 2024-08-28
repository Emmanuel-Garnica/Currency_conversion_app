import { ReactElement, ReactNode } from 'react';

export type Props<T = object> = {
  children?: ReactNode | ReactElement;
} & T;

export interface ErrorResponse {
  message: string;
  error: unknown | Error;
}
