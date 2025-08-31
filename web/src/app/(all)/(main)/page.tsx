"use client";
import apiTask from "@/api/task";
import { DeleteModal, LayoutPageTambah } from "@/components";
import { showToast } from "@/libs/helper";
import { Button, Card, Chip, useDisclosure } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Circle, CircleCheck, Clock3, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TaskData {
  id: string;
  title: string;
  status: "TO_DO" | "IN_PROGRESS" | "DONE";
}

const limitData = 10;

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [pageStart, setPageStart] = useState(0);
  const [idDelete, setIdDelete] = useState("");
  const [hasReachedBottom, setHasReachedBottom] = useState(false);
  const [listTask, setListTask] = useState<{
    data: TaskData[];
    hasMore: boolean;
  }>({
    data: [],
    hasMore: true,
  });

  const { isLoading, data } = useQuery<{
    isSuccess: boolean;
    task: TaskData[];
  }>({
    queryKey: ["task", { start: pageStart }],
    queryFn: () =>
      apiTask.getData({
        start: pageStart,
        limit: limitData,
      }),
  });

  useEffect(() => {
    if (!isLoading && data?.isSuccess) {
      const tempListTask = { ...listTask };
      tempListTask.data = [...listTask.data, ...data.task];
      tempListTask.hasMore = data.task.length == limitData;
      setListTask(tempListTask);
    }
  }, [isLoading, data]);

  const { mutateAsync } = useMutation({
    mutationFn: () => apiTask.deleteDataById(idDelete),
    onSuccess: (res) => {
      if (res.isSuccess) {
        showToast("Berhasil", "Data Berhasil Disimpan", "success");
        queryClient.invalidateQueries({
          queryKey: ["task"],
        });
      }
    },
  });

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onOpenChange: onOpenChangeDelete,
  } = useDisclosure();

  const deleteData = async (onClose: () => void) => {
    await mutateAsync();

    onClose();
  };

  useEffect(() => {
    if (listTask.data.length > 0 && listTask.hasMore && !isLoading)
      setPageStart(pageStart + limitData);
  }, [hasReachedBottom]);

  useEffect(() => {
    document.addEventListener("scrollend", () => {
      if (
        window.innerHeight + window.scrollY + 80 >=
        document.body.scrollHeight
      )
        setHasReachedBottom(true);
      else setHasReachedBottom(false);
    });
    return () => {
      document.removeEventListener("scrollend", () => {
        if (
          window.innerHeight + window.scrollY + 80 >=
          document.body.scrollHeight
        )
          setHasReachedBottom(true);
        else setHasReachedBottom(false);
      });
    };
  }, []);
  return (
    <>
      <LayoutPageTambah
        breadcrumbs={[{ label: "Tugas" }]}
        title="Tugas"
        href="/task/add"
      >
        {(() => {
          if (listTask.data.length > 0) {
            return (
              <div className="flex flex-col gap-3">
                {listTask.data.map((item) => (
                  <Card
                    key={item.id}
                    className="border-none bg-background/60 dark:bg-default-100/50 p-4 flex flex-row gap-2 items-center justify-between"
                    isBlurred
                  >
                    <div className="flex gap-3 items-center">
                      <div
                        className={`rounded-full w-12 h-12 flex justify-center items-center ${(() => {
                          if (item.status == "TO_DO") return "bg-slate-200";
                          if (item.status == "IN_PROGRESS")
                            return "bg-warning-100";
                          return "bg-success-200";
                        })()}`}
                      >
                        {(() => {
                          if (item.status == "TO_DO")
                            return (
                              <Circle size={24} className="text-slate-500" />
                            );
                          if (item.status == "IN_PROGRESS")
                            return (
                              <Clock3 size={24} className="text-warning-500" />
                            );
                          return (
                            <CircleCheck
                              size={24}
                              className="text-success-500"
                            />
                          );
                        })()}
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="font-bold text-left">
                          {item.title}
                        </span>
                        <Chip
                          radius="sm"
                          color={(() => {
                            if (item.status == "TO_DO") return "default";
                            else if (item.status == "IN_PROGRESS")
                              return "warning";
                            return "success";
                          })()}
                        >
                          {(() => {
                            if (item.status == "TO_DO") return "To Do";
                            else if (item.status == "IN_PROGRESS")
                              return "In Progress";
                            return "Done";
                          })()}
                        </Chip>
                      </div>
                    </div>
                    <div className="flex gap-2 items-end justify-between">
                      <Button
                        isIconOnly
                        variant="faded"
                        onPress={() => {
                          router.push(`/task/edit/${item.id}`);
                        }}
                      >
                        <Pencil className="text-xl text-warning pointer-events-none flex-shrink-0" />
                      </Button>
                      <Button
                        isIconOnly
                        variant="faded"
                        onPress={() => {
                          setIdDelete(item.id);
                          onOpenDelete();
                        }}
                      >
                        <Trash2 className="text-xl text-danger pointer-events-none flex-shrink-0" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            );
          }
          return (
            <div className="flex h-40 justify-center items-center text-slate-500 text-large">
              Belum memiliki Tugas
            </div>
          );
        })()}
      </LayoutPageTambah>
      <DeleteModal
        deleteFunction={deleteData}
        isOpen={isOpenDelete}
        onOpenChange={onOpenChangeDelete}
      />
    </>
  );
}
