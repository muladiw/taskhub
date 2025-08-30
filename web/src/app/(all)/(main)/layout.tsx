import { ReactNode } from 'react';
import MainLayout from '@/app/(all)/(main)/mainLayout';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'TaskHub | Home', default: 'TaskHub' },
};

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <MainLayout />
      <div className='p-4 lg:px-6 flex flex-col gap-6 flex-1'>{children}</div>
    </>
  );
}
