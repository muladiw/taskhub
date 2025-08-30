import * as z from 'zod';
import { emailRequired, stringRequired } from '@/libs/zodCustomMessage';

export const Schema = z.object({
  email: emailRequired('Email'),
  password: stringRequired('Password'),
});
