/* eslint-disable @typescript-eslint/no-explicit-any */
import { z, ZodRawShape, ZodType } from 'zod';

export function stringOptional(field: string): ZodType {
  return z.string(`${field} harus teks`).nullish().or(z.literal(''));
}
export function stringRequired(field: string) {
  return z
    .string(`${field} harus teks`)
    .min(1, { message: `${field} tidak boleh kosong` });
}
export function enumRequired(label: string, field: string, value: string[]) {
  return z.enum(value, {
    // required_error: `${label} tidak boleh kosong`,
    // invalid_type_error: `${label} harus salah satu dari ${field}`,
    message: `${label} harus salah satu dari ${field}`,
    // error: (issue, ctx) => {
    //   switch (issue.code) {
    //     case 'invalid_type': {
    //       if (ctx.data === undefined)
    //         return { message: `${label} tidak boleh kosong` };
    //       return { message: `${label} harus teks` };
    //     }

    //     case 'invalid_enum_value':
    //       return {
    //         message: `${label} harus salah satu dari ${field}`,
    //       };
    //   }
    //   return { message: ctx.defaultError };
    // },
  });
}
export function emailRequired(field: string) {
  return (
    z
      // .string({
      //   invalid_type_error: `${field} harus teks`,
      //   required_error: `${field} tidak boleh kosong`,
      // })
      .email({ message: `Format ${field.toLowerCase()} tidak sesuai` })
      .min(1, { message: `${field} tidak boleh kosong` })
  );
}
