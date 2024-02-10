'use client';

import React, { useState } from "react"
import { Room, User } from '@prisma/client';
import { format } from 'date-fns';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import useOtherUser from '@/hooks/useOtherUser';
import useActiveList from '@/hooks/useActiveList';
import useRoom from '@/hooks/useRoom';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ProfileDrawerProps {
  data: Room & {
    users: User[]
  },
  children: React.ReactNode
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  data,
  children
}) => {
  const router = useRouter();
  const { roomId } = useRoom();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const otherUser = useOtherUser(data);

  const joinedDate = format(new Date(otherUser.createdAt), 'PP');
  const title = data.name || otherUser.name;

  const { members } = useActiveList();

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/rooms/${roomId}`)
      setConfirmOpen(false)
      router.push('/rooms');
      router.refresh();
    } catch (error) {
      console.log({ error })
      toast.error('Something went wrong!')
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="text-center">{title}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuSeparator />
          <DropdownMenuItem>{data.isGroup ? "Emails" : "Email"}</DropdownMenuItem>
          <DropdownMenuItem>
            <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
              {data.isGroup && (
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  {data.users.map((user) => user.email).join(', ')}
                </dd>
              )}
              {!data.isGroup && (
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  {otherUser.email}
                </dd>
              )}
            </dl>
          </DropdownMenuItem>
          {!data.isGroup && (
            <DropdownMenuItem>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                <time dateTime={joinedDate}>
                  Joined {joinedDate}
                </time>
              </dd>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setConfirmOpen(true)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {
        <Dialog open={confirmOpen} >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-base font-semibold leading-6 text-gray-900">Delete room</DialogTitle>
              <DialogDescription>
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this room? This action cannot be undone.
                </p>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <div className="flex space-x-4">
                <Button
                  disabled={isLoading}
                  variant="secondary"
                  onClick={() => setConfirmOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  disabled={isLoading}
                  variant="destructive"
                  onClick={onDelete}
                >
                  Delete
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
    </>
  )
}

export default ProfileDrawer;
