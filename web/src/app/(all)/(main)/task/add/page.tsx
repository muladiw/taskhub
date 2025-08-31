"use client";
import { LayoutPageKembali } from "@/components";
import { Form } from "@/app/(all)/(main)/task/form";
import apiTask from "@/api/task";

const breadcrumbs = [{ label: "Tugas" }, { label: "Tambah" }];
export default function Page() {
  const mutateFunction = (data: Record<string, string>) =>
    apiTask.postData(data);
  return (
    <LayoutPageKembali
      breadcrumbs={breadcrumbs}
      title="Tugas"
      href="/"
      titleCard="Tambah"
    >
      <Form isLoading={false} mutateFunction={mutateFunction} />
    </LayoutPageKembali>
  );
}
