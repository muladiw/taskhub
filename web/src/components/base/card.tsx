'use client';
import {
  Card as CardUI,
  CardBody as CardBodyUI,
  CardHeader as CardHeaderUI,
} from '@heroui/react';
import { PropsWithChildren, ReactNode } from 'react';

export function Card({
  children,
  className,
  ...props
}: Readonly<{
  children: ReactNode;
  className?: string;
  props?: PropsWithChildren;
}>) {
  return (
    <CardUI className={`max-w-8xl ${className}`} {...props}>
      {children}
    </CardUI>
  );
}

export function CardBody({ children }: Readonly<{ children: ReactNode }>) {
  return <CardBodyUI className='px-4'>{children}</CardBodyUI>;
}

export function CardHeader({
  title,
  endContent,
}: Readonly<{
  title: ReactNode;
  endContent?: ReactNode;
}>) {
  return (
    <CardHeaderUI className='flex justify-between px-4'>
      <h4 className='text-lg text-slate-700 content-center'>{title}</h4>
      {endContent}
    </CardHeaderUI>
  );
}
