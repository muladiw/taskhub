import * as z from "zod";
import { enumRequired, stringRequired } from "@/libs/zodCustomMessage";

export const Schema = z.object({
  title: stringRequired("Judul"),
  status: enumRequired("Status", "To Do, In Progress atau Done", [
    "TO_DO",
    "IN_PROGRESS",
    "DONE",
  ]),
});
