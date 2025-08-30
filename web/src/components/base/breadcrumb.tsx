"use client";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";

export type BREADCRUMB_ITEM = {
  label: string;
  link?: string;
};
export function Breadcrumb({
  items,
  title,
}: Readonly<{
  items: BREADCRUMB_ITEM[];
  title: string;
}>) {
  return (
    <div className="flex justify-between">
      <h1 className="text-xl font-bold text-gray-700 tracking-wide">{title}</h1>
      <Breadcrumbs variant="solid">
        {items.map((item) => (
          <BreadcrumbItem key={item.label}>{item.label}</BreadcrumbItem>
        ))}
      </Breadcrumbs>
    </div>
  );
}
