/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import Image from 'next/image';

// import apiAuth, { LOGIN } from "@/api/auth";
// import moment from "moment";
import { useEffect, useState } from 'react';
// import { showToast } from "@/libs/helper";
import { useRouter } from 'next/navigation';
import { Button, Form, Input } from '@heroui/react';
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Schema } from './validation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCookies } from '@/hooks/cookies';
import { Eye, EyeClosed, Mail } from 'lucide-react';
// import apiSocialMedia from "@/api/auth/socialMedia";
import type { cookies } from 'next/headers';

export default function Page() {
  const cookies = useCookies();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // const { mutateAsync } = useMutation({
  //   mutationFn: (data: LOGIN) => apiAuth.login(data),
  //   onSuccess: (res: {
  //     isSuccess: boolean;
  //     data: { accessToken: string; refreshToken: string };
  //   }) => {
  //     if (res.isSuccess) {
  //       showToast('success', `Berhasil`, 'Berhasil Login');
  //       const waktuExp = moment().add(2, 'M').toDate();

  //       queryClient.invalidateQueries();

  //       cookies.set('refreshToken', res.data.refreshToken, {
  //         expires: waktuExp,
  //         path: '/',
  //       });

  //       router.push('/');
  //     }
  //   },
  // });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Schema),
  });
  // const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  //   setIsSubmit(true);

  //   await mutateAsync({
  //     email: data.email,
  //     password: data.password,
  //   });
  //   setIsSubmit(false);
  // };

  useEffect(() => {
    if (cookies.get('refreshToken')) {
      // router.push('/');
    }
  }, []);

  return (
    <div className='h-screen'>
      <div className='min-h-full grid grid-cols-3 justify-center'>
        <div className='absolute top-5 left-5 md:flex hidden'>
          <Image
            className='dark:drop-shadow-[0_0_0.3rem_#ffffff70] h-fit'
            src='/vercel.png'
            alt='banner'
            width={75}
            height={75}
            priority
          />
        </div>
        <div className='hidden md:col-span-2 md:block px-6 lg:px-8 content-center py-10 bg-slate-100'>
          <div className='aspect-video w-full relative'>
            <Image
              className='dark:drop-shadow-[0_0_0.3rem_#ffffff70] sm:mx-auto'
              src='/illustration/banner.svg'
              alt='banner'
              fill
              priority
            />
          </div>
        </div>
        <div className='px-6 lg:px-8 content-center col-span-3 md:col-span-1'>
          <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <Image
              className='dark:drop-shadow-[0_0_0.3rem_#ffffff70]'
              src='/vercel.png'
              alt='banner'
              width={40}
              height={40}
              priority
            />
            <h2 className='mt-10 text-center text-xl font-bold leading-9 text-gray-900'>
              Selamat Datang
            </h2>
          </div>

          <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
            <Form
              className='flex flex-col gap-4'
              // onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name='email'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <Input
                    {...field}
                    isInvalid={!!errors.email}
                    errorMessage={errors?.email?.message as string}
                    label='Email'
                    placeholder='budi@gmail.com'
                    type='email'
                    labelPlacement='outside'
                    radius='sm'
                  />
                )}
              />
              <Controller
                name='password'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <Input
                    {...field}
                    isInvalid={!!errors.password}
                    errorMessage={errors?.password?.message as string}
                    label='Password'
                    placeholder='********'
                    type={isVisible ? 'text' : 'password'}
                    labelPlacement='outside'
                    radius='sm'
                    endContent={
                      <button
                        aria-label='toggle password visibility'
                        className='focus:outline-none'
                        type='button'
                        onClick={() => setIsVisible(!isVisible)}
                      >
                        {isVisible ? (
                          <Eye className='text-2xl text-default-400 pointer-events-none' />
                        ) : (
                          <EyeClosed className='text-2xl text-default-400 pointer-events-none' />
                        )}
                      </button>
                    }
                  />
                )}
              />
              <Button
                color='primary'
                radius='sm'
                isLoading={isSubmit}
                type='submit'
                className='w-full'
              >
                Login
              </Button>
            </Form>
          </div>
        </div>
      </div>
      <footer className='absolute bottom-5'>
        <span className='pl-10 font-light text-sm text-gray-700'>
          iniaku.id©{new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
}
