// import toast, { ToastOptions, ToastPosition } from "react-hot-toast";
import { X } from 'lucide-react';
import { ChangeEvent } from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

export const showToast = (
  type: string,
  title: string,
  pesan: string
  // position: ToastPosition | undefined = undefined
) => {
  // const tFunction = (t: { id: string }) => (
  //   <div className="w-full flex justify-between">
  //     <div>
  //       <p className="mb-0"> {title} </p>
  //       <small> {pesan} </small>
  //     </div>
  //     <button
  //       type="button"
  //       className="w-5 h-5 text-red-400"
  //       onClick={() => toast.dismiss(t.id)}
  //     >
  //       <X size={16} />
  //     </button>
  //   </div>
  // );
  // const options: ToastOptions = {
  //   style: {
  //     minWidth: "280px",
  //   },
  //   position,
  //   duration: 5000,
  // };
  // if (type === "success") toast.success(tFunction, options);
  // else toast.error(tFunction, options);
};

// export const showError = (errorMessage: string, title: string) => {
//   showToast("error", title, errorMessage, "top-right");
// };

export const convertThousand = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    currency: 'IDR',
  }).format(value);

export interface OPTION {
  id: string;
  label: string;
}

export const defaultState = {
  column: 'updatedAt',
  direction: 'descending',
  search: '',
  rowsPerPage: '10',
  start: 0,
  page: 1,
};

export const changeNumberThousand = (
  e: ChangeEvent<HTMLInputElement>,
  setValue: UseFormSetValue<FieldValues>,
  name: string
) => {
  if (e.target.value === '0') {
    setValue(`${name}2`, '0');
    setValue(name, 0, {
      shouldValidate: true,
    });
  } else if (e.target.value) {
    const inputData = Number(e.target.value.replaceAll('.', ''));
    if (!isNaN(inputData)) {
      setValue(`${name}2`, convertThousand(inputData));
      setValue(name, inputData, {
        shouldValidate: true,
      });
    }
  } else {
    setValue(`${name}2`, '');
    setValue(name, undefined, {
      shouldValidate: true,
    });
  }
};
