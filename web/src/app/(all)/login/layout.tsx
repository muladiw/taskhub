import { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
