"use client";
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema } from "@/app/(all)/(main)/task/validation";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Input, Select, SelectItem, Skeleton } from "@heroui/react";
import { showToast } from "@/libs/helper";
import { useRouter } from "next/navigation";
import { BREADCRUMB, LayoutSkeleton, SkeletonInput } from "@/components";

export type InitialData = {
  title: string;
  status: string;
};

export function Form({
  initialData,
  isLoading,
  mutateFunction,
  canSubmit = true,
}: Readonly<{
  initialData?: InitialData;
  isLoading: boolean;
  mutateFunction: (
    data: Record<string, string>
  ) => Promise<{ isSuccess: boolean }>;
  canSubmit?: boolean;
}>) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [prevData, setPrevData] = useState<InitialData | undefined>(
    initialData
  );
  const [isSubmit, setIsSubmit] = useState(false);

  const { mutateAsync } = useMutation({
    mutationFn: mutateFunction,
    onSuccess: (res) => {
      if (res.isSuccess) {
        showToast("Berhasil", "Data Berhasil Disimpan", "success");
        queryClient.invalidateQueries({
          queryKey: ["task"],
        });
        router.push("/");
      }
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (canSubmit) {
      setIsSubmit(true);
      await mutateAsync(data);
      setIsSubmit(false);
    }
  };

  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Schema),
  });

  if (initialData != prevData && initialData) {
    setValue("title", initialData.title);
    setValue("status", initialData.status);
    setPrevData(initialData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-12">
        <div className="flex flex-col gap-4 sm:col-start-2 col-span-12 sm:col-span-10">
          {!isLoading ? (
            <>
              <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Judul"
                    variant="bordered"
                    radius="sm"
                    isInvalid={!!errors.title}
                    errorMessage={errors?.title?.message as string}
                  />
                )}
              />
              <Controller
                name="status"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    {...field}
                    className="col-span-12 sm:col-span-7 lg:col-span-8 xl:col-span-9"
                    label="Status"
                    variant="bordered"
                    radius="sm"
                    onChange={(e) => {
                      setValue("status", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                    selectedKeys={[field.value]}
                    isInvalid={!!errors.status}
                    errorMessage={errors?.status?.message as string}
                  >
                    <SelectItem key="TO_DO">To Do</SelectItem>
                    <SelectItem key="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem key="DONE">Done</SelectItem>
                  </Select>
                )}
              />
              {canSubmit && (
                <div className="flex items-center justify-end">
                  <Button
                    color="primary"
                    radius="sm"
                    isLoading={isSubmit}
                    type="submit"
                  >
                    Simpan
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <Skeleton className="rounded-lg">
                <div className="h-14 rounded-lg bg-default-200"></div>
              </Skeleton>
              <div className="flex justify-end">
                <Skeleton className="w-1/12 rounded-lg">
                  <div className="h-10 w-1/12 rounded-lg bg-default-200"></div>
                </Skeleton>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

export function FormLoading({ breadcrumbs }: { breadcrumbs: BREADCRUMB[] }) {
  return (
    <LayoutSkeleton breadcrumbs={breadcrumbs} title="Barang">
      <div className="grid grid-cols-12">
        <div className="flex flex-col gap-4 sm:col-start-2 col-span-12 sm:col-span-10">
          <div className="space-y-4">
            <SkeletonInput />
            <div className="flex justify-end">
              <Skeleton className="w-1/12 rounded-lg">
                <div className="h-10 w-1/12 rounded-lg bg-default-200"></div>
              </Skeleton>
            </div>
          </div>
        </div>
      </div>
    </LayoutSkeleton>
  );
}
