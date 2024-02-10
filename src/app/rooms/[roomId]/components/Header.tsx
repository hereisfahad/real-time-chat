'use client';

import { FC } from "react";
import Link from "next/link";
import { Room, User } from "@prisma/client";
import { ChevronLeftIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid';

import useOtherUser from "@/hooks/useOtherUser";
import useActiveList from "@/hooks/useActiveList";
import AvatarGroup from "@/components/AvatarGroup";
import ProfileDrawer from "./ProfileDrawer";
import Avatar from '@/components/Avatar';

interface HeaderProps {
  room: Room & {
    users: User[]
  }
}

const Header: FC<HeaderProps> = ({ room }) => {
  const otherUser = useOtherUser(room);
  const { members } = useActiveList();

  const isActive = members.indexOf(otherUser?.email!) !== -1;
  const statusText = room.isGroup ? `${room.users.length} members` : isActive ? 'Active' : 'Offline'

  return (
    <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
      <div className="flex gap-3 items-center">
        <Link
          href="/rooms"
          className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>
        {room.isGroup ? (
          <AvatarGroup users={room.users} />
        ) : (
          <Avatar src={otherUser.image as string} name={otherUser.name as string} />
        )}
        <div className="flex flex-col">
          <div>{room.name || otherUser.name}</div>
          <div className="text-sm font-light text-neutral-500">
            {statusText}
          </div>
        </div>
      </div>
      <ProfileDrawer data={room}>
        <EllipsisHorizontalIcon
          className="text-sky-500 cursor-pointer hover:text-sky-600 transition w-6 h-6"
        />
      </ProfileDrawer>
    </div>
  );
}

export default Header;
