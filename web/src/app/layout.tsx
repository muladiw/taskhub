import type { Metadata } from 'next';
import { Mulish } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import Providers from '@/app/providers';

const mulish = Mulish({
  weight: ['400', '500', '600', '700', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: 'Iniaku | %s',
    default: 'Iniaku', // a default is required when creating a template
  },
  description: 'Iniaku | Diagnostic Center',
  applicationName: 'Iniaku',
  keywords: [
    'Iniaku',
    'Diagnostic',
    'Center',
    'Health',
    'Medical',
    'Laboratory',
  ],
  authors: [
    {
      name: 'Muladi Wahyudin',
      url: 'https://porto-one-eta.vercel.app',
    },
  ],
  creator: 'Muladi Wahyudin',
  publisher: 'Muladi Wahyudin',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${mulish.className} antialiased tracking-wide bg-white`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
