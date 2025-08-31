"use client";
import { Card, Skeleton } from "@heroui/react";
export function SkeletonCard() {
  return (
    <Card className="space-y-5 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  );
}

export function SkeletonTable() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="w-1/4 flex gap-2 items-center">
          <Skeleton className="h-6 w-6/12 rounded-lg">
            <div className="h-6 w-6/12 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-1/3 rounded-lg">
            <div className="h-10 w-1/3 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="h-6 w-2/12 rounded-lg">
            <div className="h-6 w-2/12 rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
        <Skeleton className="w-1/4 rounded-lg">
          <div className="h-10 w-1/4 rounded-lg bg-default-200"></div>
        </Skeleton>
      </div>
      <Skeleton className="rounded-lg">
        <div className="h-60 rounded-lg bg-default-200"></div>
      </Skeleton>
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-1/3 rounded-lg">
          <div className="h-6 w-1/3 rounded-lg bg-default-300"></div>
        </Skeleton>
        <Skeleton className="w-1/6 rounded-lg">
          <div className="h-9 w-1/6 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </div>
  );
}

export function SkeletonInput() {
  return (
    <Skeleton className="rounded-lg">
      <div className="h-14 rounded-lg bg-default-200"></div>
    </Skeleton>
  );
}
