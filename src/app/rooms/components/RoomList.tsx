'use client';

import { useEffect, useMemo, useState } from "react";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { MdOutlineGroupAdd } from 'react-icons/md';
import clsx from "clsx";
import _find from 'lodash/find';

import useRoom from "@/hooks/useRoom";
import RoomBox from "./RoomBox";
import { pusherClient } from "@/lib/pusher";
import { FullRoomType } from "@/types";

interface RoomListProps {
  initialItems: FullRoomType[];
  users: User[];
  title?: string;
}

const RoomList: React.FC<RoomListProps> = ({
  initialItems,
  users
}) => {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const session = useSession();

  const { roomId, isOpen } = useRoom();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email
  }, [session.data?.user?.email])

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const updateHandler = (room: FullRoomType) => {
      setItems((current) => current.map((currentRoom) => {
        if (currentRoom.id === room.id) {
          return {
            ...currentRoom,
            messages: room.messages
          };
        }

        return currentRoom;
      }));
    }

    const newHandler = (room: FullRoomType) => {
      setItems((current) => {
        if (_find(current, { id: room.id })) {
          return current;
        }

        return [room, ...current]
      });
    }

    const removeHandler = (room: FullRoomType) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id !== room.id)]
      });
    }

    pusherClient.bind('room:update', updateHandler)
    pusherClient.bind('room:new', newHandler)
    pusherClient.bind('room:remove', removeHandler)
  }, [pusherKey, router]);

  return (
    <aside
      className={clsx(
        `pb-20 lg:pb-0 overflow-y-auto pl-20`,
        isOpen ? 'hidden' : 'block w-full left-0')}
    >
      <div className="px-5">
        <div className="flex justify-between mb-4 pt-4">
          <div className="text-2xl font-bold text-neutral-800">
            Messages
          </div>
          <div
            onClick={() => setIsModalOpen(true)}
            className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition"
          >
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
        {items.map((item) => (
          <RoomBox
            key={item.id}
            data={item}
            selected={roomId === item.id}
          />
        ))}
      </div>
    </aside>
  );
}

export default RoomList;
