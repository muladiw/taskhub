'use client';
import { DeleteModal, LayoutPageTambah } from '@/components';
import { Button, Card, useDisclosure } from '@heroui/react';
import { Circle, CircleCheck, Clock3, Pencil, Trash2 } from 'lucide-react';

export default function Page() {
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onOpenChange: onOpenChangeDelete,
  } = useDisclosure();

  const deleteData = async (onClose: () => void) => {
    // await mutateAsync();

    onClose();
  };
  return (
    <>
      <LayoutPageTambah
        breadcrumbs={[{ label: 'Kas' }, { label: 'Kategori' }]}
        title='Kategori'
        href='/treasurer/category/add'
      >
        <div className='flex flex-col gap-3'>
          <Card
            className='border-none bg-background/60 dark:bg-default-100/50 p-4 flex flex-row gap-2 items-center justify-between'
            isBlurred
            onScrollEnd={() => {
              console.log('disini');
            }}
            onPress={() => {
              // setId(item.id);
              // setCanSubmit(!!user.access['treasurer-transaction']?.update);
              // onOpen();
            }}
          >
            <div className='flex gap-3 items-center'>
              <div
                className={`rounded-full w-12 h-12 flex justify-center items-center bg-slate-200`}
              >
                <Circle size={24} className='text-slate-500' />
                {/* {item.type == 'in' ? (
              <ArrowUpLeft size={24} className='text-success' />
            ) : (
              <ArrowDown size={24} className='text-danger' />
            )} */}
              </div>
              <div className='flex flex-col'>
                <span className='font-bold text-left'>Title</span>
                {/* {item.description && (
              <span className='text-small text-slate-500 text-left'>
                {item.description}
              </span>
            )}
            <span className='text-xs text-slate-400'>
              {moment(item.date).format('DD-MM-YYYY HH:mm:ss')}
            </span> */}
              </div>
            </div>
            <div className='flex gap-2 items-end justify-between'>
              {/* <span
            className={`text-lg font-bold text-nowrap ${
              item.type == 'in' ? 'text-success' : 'text-danger'
            }`}
          >
            {item.type == 'in' ? '+' : '-'}Rp
            {convertThousand(item.amount)}
          </span> */}
              <Button
                isIconOnly
                variant='faded'
                onPress={() => {
                  // setIdDelete(item.id);
                  // onOpenDelete();
                }}
              >
                <Pencil className='text-xl text-warning pointer-events-none flex-shrink-0' />
              </Button>
              <Button
                isIconOnly
                variant='faded'
                onPress={() => {
                  // setIdDelete(item.id);
                  // onOpenDelete();
                }}
              >
                <Trash2 className='text-xl text-danger pointer-events-none flex-shrink-0' />
              </Button>
            </div>
          </Card>
          <Card
            className='border-none bg-background/60 dark:bg-default-100/50 p-4 flex flex-row gap-2 items-center justify-between'
            isBlurred
            onScrollEnd={() => {
              console.log('disini');
            }}
            onPress={() => {
              // setId(item.id);
              // setCanSubmit(!!user.access['treasurer-transaction']?.update);
              // onOpen();
            }}
          >
            <div className='flex gap-3 items-center'>
              <div
                className={`rounded-full w-12 h-12 flex justify-center items-center bg-sky-100`}
              >
                <Clock3 size={24} className='text-sky-500' />
                {/* {item.type == 'in' ? (
              <ArrowUpLeft size={24} className='text-success' />
            ) : (
              <ArrowDown size={24} className='text-danger' />
            )} */}
              </div>
              <div className='flex flex-col'>
                <span className='font-bold text-left'>Title</span>
                {/* {item.description && (
              <span className='text-small text-slate-500 text-left'>
                {item.description}
              </span>
            )}
            <span className='text-xs text-slate-400'>
              {moment(item.date).format('DD-MM-YYYY HH:mm:ss')}
            </span> */}
              </div>
            </div>
            <div className='flex flex-col items-end justify-between'>
              {/* <span
            className={`text-lg font-bold text-nowrap ${
              item.type == 'in' ? 'text-success' : 'text-danger'
            }`}
          >
            {item.type == 'in' ? '+' : '-'}Rp
            {convertThousand(item.amount)}
          </span> */}
              <Button
                isIconOnly
                variant='faded'
                onPress={() => {
                  // setIdDelete(item.id);
                  // onOpenDelete();
                }}
              >
                <Trash2 className='text-xl text-danger pointer-events-none flex-shrink-0' />
              </Button>
            </div>
          </Card>
          <Card
            className='border-none bg-background/60 dark:bg-default-100/50 p-4 flex flex-row gap-2 items-center justify-between'
            isBlurred
            onScrollEnd={() => {
              console.log('disini');
            }}
            onPress={() => {
              // setId(item.id);
              // setCanSubmit(!!user.access['treasurer-transaction']?.update);
              // onOpen();
            }}
          >
            <div className='flex gap-3 items-center'>
              <div
                className={`rounded-full w-12 h-12 flex justify-center items-center bg-success-100`}
              >
                <CircleCheck size={24} className='text-success-500' />
                {/* {item.type == 'in' ? (
              <ArrowUpLeft size={24} className='text-success' />
            ) : (
              <ArrowDown size={24} className='text-danger' />
            )} */}
              </div>
              <div className='flex flex-col'>
                <span className='font-bold text-left'>Title</span>
                {/* {item.description && (
              <span className='text-small text-slate-500 text-left'>
                {item.description}
              </span>
            )}
            <span className='text-xs text-slate-400'>
              {moment(item.date).format('DD-MM-YYYY HH:mm:ss')}
            </span> */}
              </div>
            </div>
            <div className='flex flex-col items-end justify-between'>
              {/* <span
            className={`text-lg font-bold text-nowrap ${
              item.type == 'in' ? 'text-success' : 'text-danger'
            }`}
          >
            {item.type == 'in' ? '+' : '-'}Rp
            {convertThousand(item.amount)}
          </span> */}
              <Button
                isIconOnly
                variant='faded'
                onPress={() => {
                  // setIdDelete(item.id);
                  // onOpenDelete();
                }}
              >
                <Trash2 className='text-xl text-danger pointer-events-none flex-shrink-0' />
              </Button>
            </div>
          </Card>
        </div>
      </LayoutPageTambah>
      <DeleteModal
        deleteFunction={deleteData}
        isOpen={isOpenDelete}
        onOpenChange={onOpenChangeDelete}
      />
    </>
  );
}
