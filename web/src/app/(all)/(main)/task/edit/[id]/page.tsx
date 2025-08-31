"use client";
import { Form } from "@/app/(all)/(main)/task/form";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { LayoutPageKembali } from "@/components";
import apiTask from "@/api/task";

export default function EditById() {
  const params = useParams<{ id: string }>();
  const { isLoading, data } = useQuery({
    queryKey: ["task", params.id],
    queryFn: () => apiTask.getDataById(params.id),
  });

  const mutateFunction = (data: Record<string, string | number>) =>
    apiTask.putDataById(params.id, data);
  return (
    <LayoutPageKembali
      breadcrumbs={[{ label: "Tugas" }]}
      title="Tugas"
      href="/"
      titleCard="Edit Data"
    >
      <Form
        initialData={data?.task}
        isLoading={isLoading}
        mutateFunction={mutateFunction}
      />
    </LayoutPageKembali>
  );
}
