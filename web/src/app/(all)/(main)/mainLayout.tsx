/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useCookies } from '@/hooks/cookies';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuToggle,
  NavbarMenu,
  Accordion,
  AccordionItem,
} from '@heroui/react';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useContext, useEffect, useState } from 'react';
import {
  Apple,
  Archive,
  ChevronDown,
  Database,
  Flame,
  LayoutDashboard,
  LogOut,
  Mail,
  Medal,
  Microscope,
  Package,
  Package2,
  Shapes,
  Users,
  Warehouse,
} from 'lucide-react';
import Link from 'next/link';
// import { ACCESS_TYPE, UserContext } from '@/app/(all)/(main)/userContext';
import { useQuery } from '@tanstack/react-query';
// import apiUser from '@/api/user';
// import { GlobalContext, ScreenSize } from '@/app/(all)/globalContext';
import Image from 'next/image';
// import { useGoogleLogin } from '@react-oauth/google';
// import apiSocialMedia from '@/api/auth/socialMedia';
import moment from 'moment';

type NAVIGATION_TYPE = {
  name: string;
  href: string;
  icon?: ReactNode;
  children?: NAVIGATION_TYPE[];
};

export default function MainLayout() {
  const cookies = useCookies();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const [navigation, setNavigation] = useState<NAVIGATION_TYPE[]>([
    {
      name: 'Tugas Saya',
      href: '/',
      icon: <LayoutDashboard size={16} strokeWidth={3} />,
    },
  ]);

  // const { isLoading, data } = useQuery({
  //   queryKey: ['user', 'access'],
  //   queryFn: () => apiUser.getAccess(),
  //   enabled: !!cookies.get('refreshToken'),
  // });

  // useEffect(() => {
  //   if (!isLoading && data?.isSuccess) {
  //     const tempAccess: ACCESS_TYPE = {};
  //     const tempDataAkses = data.data.user.access;
  //     for (const key in tempDataAkses) {
  //       tempAccess[key] = {};
  //       for (const item of tempDataAkses[key]) {
  //         tempAccess[key][item] = true;
  //       }
  //     }

  //     setUser({
  //       ...data.data.user,
  //       access: tempAccess,
  //       isLoading: false,
  //     });
  //     generateNavigation(tempAccess);
  //   }
  // }, [isLoading, data, screenSize]);

  useEffect(() => {
    if (!cookies.get('refreshToken')) {
      router.push('/login');
    }
  }, []);

  return (
    <Navbar
      className='bg-secondary text-white'
      maxWidth='full'
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className='sm:hidden' justify='start'>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
        <NavbarBrand>
          <Image
            className='dark:drop-shadow-[0_0_0.3rem_#ffffff70]'
            src='/vercel.png'
            alt='banner'
            width={36}
            height={36}
            priority
          />
        </NavbarBrand>
      </NavbarContent>
      <NavbarBrand className='hidden sm:flex'>
        <Image
          className='dark:drop-shadow-[0_0_0.3rem_#ffffff70]'
          src='/vercel.png'
          alt='banner'
          width={36}
          height={36}
          priority
        />
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        {navigation.map((item) =>
          item.children && item.children.length > 0 ? (
            <Dropdown key={item.name}>
              <NavbarItem
                isActive={pathname.split('/')[1] == item.href.split('/')[1]}
              >
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className={`p-0 gap-1 bg-transparent data-[hover=true]:bg-transparent ${
                      pathname.split('/')[1] == item.href.split('/')[1]
                        ? 'font-bold text-yellow-300'
                        : 'text-white'
                    }`}
                    endContent={<ChevronDown size={16} strokeWidth={3} />}
                    radius='sm'
                    variant='light'
                  >
                    {item.name}
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                itemClasses={{
                  base: 'gap-4',
                }}
                closeOnSelect={false}
              >
                {item.children.map((child) =>
                  child.children && child.children.length > 0 ? (
                    <DropdownItem key={child.name} startContent={child.icon}>
                      <Dropdown>
                        <DropdownTrigger>
                          <div className='flex justify-between'>
                            {child.name}
                            <ChevronDown size={16} strokeWidth={3} />
                          </div>
                        </DropdownTrigger>
                        <DropdownMenu aria-label='Static Actions'>
                          {child.children.map((grandChild) => (
                            <DropdownItem
                              key={grandChild.name}
                              startContent={grandChild.icon}
                              onPress={() => router.push(grandChild.href)}
                            >
                              {grandChild.name}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    </DropdownItem>
                  ) : (
                    <DropdownItem
                      key={child.name}
                      startContent={child.icon}
                      onPress={() => router.push(child.href)}
                      closeOnSelect
                    >
                      {child.name}
                    </DropdownItem>
                  )
                )}
              </DropdownMenu>
            </Dropdown>
          ) : (
            <NavbarItem
              isActive={pathname.split('/')[1] == item.href.split('/')[1]}
              key={item.name}
            >
              <Button
                as={Link}
                disableRipple
                className={`p-0 gap-1 bg-transparent data-[hover=true]:bg-transparent ${
                  pathname.split('/')[1] == item.href.split('/')[1]
                    ? 'font-bold text-yellow-300'
                    : 'text-white'
                }`}
                href={item.href}
                endContent={item.icon}
                radius='sm'
                variant='light'
              >
                {item.name}
              </Button>
            </NavbarItem>
          )
        )}
      </NavbarContent>
      <NavbarContent as='div' justify='end'>
        <div className='hidden md:flex flex-col justify-center max-w-[200px] text-nowrap line-clamp-1 text-end'>
          <span className='font-extrabold text-sm'>
            {/* {data?.data.user.name} */}
          </span>
          <span className='font-semibold text-sm'>
            {/* {data?.data.user.group} */}
          </span>
        </div>
        <Dropdown placement='bottom-end'>
          <DropdownTrigger>
            <Avatar
              showFallback
              src='https://images.unsplash.com/broken'
              isBordered
              className='transition-transform cursor-pointer'
              color='secondary'
            />
          </DropdownTrigger>
          <DropdownMenu aria-label='Profile Actions' variant='flat'>
            <DropdownItem key='profile' className='h-14 gap-2 md:hidden'>
              {/* <p className='font-bold text-lg'>{data?.data.user.name}</p>
                  <p className='font-semibold'>{data?.data.user.group}</p> */}
            </DropdownItem>
            <DropdownItem
              key='keluar'
              startContent={<LogOut size={16} />}
              className='text-danger'
              color='danger'
              onPress={() => {
                cookies.remove('refreshToken');
                if (process.env.NEXT_PUBLIC_APP == 'kas')
                  window.location = '/' as string & Location;
                else router.push('/login');
              }}
            >
              Keluar
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarMenu>
        {navigation.map((item) =>
          item.children && item.children.length > 0 ? (
            <Accordion
              variant='light'
              className='w-fit'
              isCompact
              key={item.name}
              itemClasses={{
                title:
                  pathname.split('/')[1] == item.href.split('/')[1]
                    ? 'text-primary'
                    : 'text-black',
              }}
            >
              <AccordionItem
                key='1'
                aria-label='Menu Mobile'
                title={item.name}
                className={`font-semibold`}
              >
                <ul className='list-disc list-inside pl-4 font-normal'>
                  <li className='flex flex-col gap-3'>
                    {item.children.map((child) => (
                      <Link
                        className='text-gray-600 cursor-pointer'
                        href={child.href}
                        key={child.name}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </li>
                </ul>
              </AccordionItem>
            </Accordion>
          ) : (
            <Link
              className={`font-semibold text-black p-2 cursor-pointer ${
                pathname.split('/')[1] == item.href.split('/')[1]
                  ? 'text-primary'
                  : 'text-black'
              }`}
              href={item.href}
              key={item.name}
            >
              {item.name}
            </Link>
          )
        )}
      </NavbarMenu>
    </Navbar>
  );
}
