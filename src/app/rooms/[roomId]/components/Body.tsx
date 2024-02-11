'use client';

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import _find from "lodash/find";
import { useRouter } from "next/navigation";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { pusherClient } from "@/lib/pusher";
import useRoom from "@/hooks/useRoom";
import MessageBox from "./MessageBox";
import { FullMessageType } from "@/types";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages = [] }) => {
  const router = useRouter()
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(initialMessages);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { roomId } = useRoom();

  useEffect(() => {
    axios.post(`/api/rooms/${roomId}/seen`);
  }, [roomId]);

  useEffect(() => {
    pusherClient.subscribe(roomId as string)
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/rooms/${roomId}/seen`);

      setMessages((current) => {
        if (_find(current, { id: message.id })) {
          return current;
        }

        return [...current, message]
      });

      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) => current.map((currentMessage) => {
        if (currentMessage.id === newMessage.id) {
          return newMessage;
        }

        return currentMessage;
      }))
    };

    pusherClient.bind('messages:new', messageHandler)
    pusherClient.bind('message:update', updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(roomId as string)
      pusherClient.unbind('messages:new', messageHandler)
      pusherClient.unbind('message:update', updateMessageHandler)
    }
  }, [roomId]);

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
    <div className="flex-1 overflow-y-auto">
      <ContextMenu>
        <ContextMenuTrigger className="flex h-full w-full items-center justify-center text-sm">
          {messages.map((message, i) => (
            <MessageBox
              isLast={i === messages.length - 1}
              key={message.id}
              data={message}
            />
          ))}
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem inset onClick={() => router.push("/rooms")}>
            Close chat
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem inset onClick={() => setConfirmOpen(true)}>
            Delete chat
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
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
      <div className="pt-24" ref={bottomRef} />
    </div>
  );
}

export default Body;
