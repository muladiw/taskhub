'use client';
import { Skeleton, Tooltip } from '@heroui/react';
import { Breadcrumb, CardHeader, Card, CardBody } from '@/components';
import { FC, HTMLAttributes, ReactNode } from 'react';
import { Button } from '@heroui/react';
import Link from 'next/link';
import { ArrowLeft, CirclePlus, Filter, FilterX } from 'lucide-react';

export type BREADCRUMB = {
  label: string;
};
export function LayoutPage({
  children,
  breadcrumbs,
  title,
  titleCard,
  endContent,
}: Readonly<{
  children: ReactNode;
  breadcrumbs: BREADCRUMB[];
  title: string;
  titleCard: ReactNode;
  endContent: ReactNode;
}>) {
  return (
    <>
      <Breadcrumb items={breadcrumbs} title={title} />
      <Card>
        <CardHeader title={titleCard} endContent={endContent} />
        <CardBody>{children}</CardBody>
      </Card>
    </>
  );
}

interface LayoutPageTambahProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  breadcrumbs: BREADCRUMB[];
  title: string;
  href: string;
  clickExpandFilter?: () => void;
  canAccessCreate?: boolean;
  isExpandFilter?: boolean;
}

export const LayoutPageTambah: FC<LayoutPageTambahProps> = ({
  children,
  breadcrumbs,
  title,
  href,
  clickExpandFilter,
  canAccessCreate = true,
  isExpandFilter,
}) => {
  return (
    <LayoutPage
      breadcrumbs={breadcrumbs}
      title={title}
      titleCard='Data'
      endContent={
        <div className='flex gap-2'>
          {clickExpandFilter && (
            <Tooltip content='Filter'>
              <Button
                startContent={
                  isExpandFilter ? (
                    <FilterX className='text-xl pointer-events-none flex-shrink-0' />
                  ) : (
                    <Filter className='text-xl pointer-events-none flex-shrink-0' />
                  )
                }
                radius='sm'
                variant='flat'
                color={isExpandFilter ? 'danger' : 'success'}
                isIconOnly
                onPress={() => clickExpandFilter()}
              />
            </Tooltip>
          )}
          {canAccessCreate && (
            <Button
              color='primary'
              as={Link}
              href={href}
              endContent={
                <CirclePlus className='text-xl pointer-events-none flex-shrink-0' />
              }
              radius='sm'
            >
              Tambah
            </Button>
          )}
        </div>
      }
    >
      {children}
    </LayoutPage>
  );
};

interface LayoutPageKembaliProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  breadcrumbs: BREADCRUMB[];
  title: string;
  titleCard: string;
  href: string;
}

export const LayoutPageKembali: FC<LayoutPageKembaliProps> = ({
  children,
  breadcrumbs,
  title,
  href,
  titleCard,
}) => {
  return (
    <LayoutPage
      breadcrumbs={breadcrumbs}
      title={title}
      titleCard={titleCard}
      endContent={
        <Button
          as={Link}
          href={href}
          startContent={
            <ArrowLeft className='text-xl pointer-events-none flex-shrink-0' />
          }
          variant='flat'
          radius='sm'
        >
          Kembali
        </Button>
      }
    >
      {children}
    </LayoutPage>
  );
};

export function LayoutSkeleton({
  children,
  breadcrumbs,
  title,
}: Readonly<{
  children: ReactNode;
  breadcrumbs: BREADCRUMB[];
  title: string;
}>) {
  return (
    <LayoutPage
      breadcrumbs={breadcrumbs}
      title={title}
      titleCard={
        <Skeleton className='rounded-lg w-12'>
          <div className='h-7 rounded-lg bg-default-200'></div>
        </Skeleton>
      }
      endContent={
        <Skeleton className='rounded-lg w-32'>
          <div className='h-10 rounded-lg bg-default-200'></div>
        </Skeleton>
      }
    >
      {children}
    </LayoutPage>
  );
}
