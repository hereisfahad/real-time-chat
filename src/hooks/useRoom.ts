"use client"

import { useMemo } from "react";
import { useParams } from "next/navigation";

const useRoom = () => {
  const params = useParams();

  const roomId = useMemo(() => {
    return params?.roomId ?? "" as string;
  }, [params?.roomId]);

  const isOpen = useMemo(() => !!roomId, [roomId]);

  return useMemo(() => ({
    isOpen,
    roomId
  }), [isOpen, roomId]);
};

export default useRoom;
