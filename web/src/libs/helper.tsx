import { addToast } from "@heroui/react";
import { ChangeEvent } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";

export const showToast = (
  title: string,
  message: string,
  color?:
    | "default"
    | "foreground"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger",
  position?: string
) => {
  addToast({
    title,
    description: message,
    color,
  });
};

export const showError = (errorMessage: string, title: string) => {
  showToast(title, errorMessage, "danger", "top-right");
};

export const convertThousand = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    currency: "IDR",
  }).format(value);

export interface OPTION {
  id: string;
  label: string;
}

export const defaultState = {
  column: "updatedAt",
  direction: "descending",
  search: "",
  rowsPerPage: "10",
  start: 0,
  page: 1,
};

export const changeNumberThousand = (
  e: ChangeEvent<HTMLInputElement>,
  setValue: UseFormSetValue<FieldValues>,
  name: string
) => {
  if (e.target.value === "0") {
    setValue(`${name}2`, "0");
    setValue(name, 0, {
      shouldValidate: true,
    });
  } else if (e.target.value) {
    const inputData = Number(e.target.value.replaceAll(".", ""));
    if (!isNaN(inputData)) {
      setValue(`${name}2`, convertThousand(inputData));
      setValue(name, inputData, {
        shouldValidate: true,
      });
    }
  } else {
    setValue(`${name}2`, "");
    setValue(name, undefined, {
      shouldValidate: true,
    });
  }
};
