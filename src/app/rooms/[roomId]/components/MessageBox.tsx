'use client';

import { format } from "date-fns";
import { useSession } from "next-auth/react";

import { FullMessageType } from "@/types";
import Avatar from "@/components/Avatar";
import { cn } from "@/lib/utils";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({
  data,
  isLast
}) => {
  const session = useSession();

  const isOwn = session.data?.user?.email === data?.sender?.email
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(', ');

  return (
    <div className={cn('flex gap-3 p-', isOwn ? 'justify-end' : '')}>
      <div className={cn(isOwn ? 'order-2' : '')}>
        <Avatar src={data.sender.image as string} name={data.sender.name as string} />
      </div>
      <div className={cn('flex flex-col gap-2', isOwn ? 'items-end' : '')}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">
            {data.sender.name}
          </div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), 'p')}
          </div>
        </div>
        <div className={cn(
          'text-sm w-fit overflow-hidden',
          isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100',
          data.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
        )}>
          <div>{data.body}</div>
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div className="text-xs font-light text-gray-500">
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageBox;
