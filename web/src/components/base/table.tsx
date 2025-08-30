/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import {
  Button,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
} from '@heroui/react';
import { CircleAlert, Trash2 } from 'lucide-react';
import { useState } from 'react';

export function DeleteModal({
  deleteFunction,
  isOpen,
  onOpenChange,
}: Readonly<{
  deleteFunction: (onClose: () => void) => void;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}>) {
  const [isDelete, setIsDelete] = useState(false);
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className='pt-6 text-2xl font-semibold items-center flex'>
              <CircleAlert className='w-20 h-20 text-warning flex-shrink-0' />
              Apakah anda yakin?
            </ModalBody>
            <ModalFooter>
              <Button
                color='default'
                variant='flat'
                onPress={onClose}
                isLoading={isDelete}
              >
                Batal
              </Button>
              <Button
                color='danger'
                variant='flat'
                onPress={() => {
                  setIsDelete(true);
                  deleteFunction(onClose);
                  setIsDelete(false);
                }}
                isLoading={isDelete}
                startContent={
                  <Trash2 className='text-xl text-danger pointer-events-none flex-shrink-0' />
                }
              >
                Hapus
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
