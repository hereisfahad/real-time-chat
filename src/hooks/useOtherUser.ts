import { useSession } from "next-auth/react";
import { useMemo } from "react";

import { FullRoomType } from "@/types";
import { User } from "@prisma/client";

const useOtherUser = (room: FullRoomType | { users: User[] }) => {
  const session = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session.data?.user?.email;

    const otherUser = room.users.filter((user) => user.email !== currentUserEmail);

    return otherUser[0];
  }, [session.data?.user?.email, room.users]);

  return otherUser;
};

export default useOtherUser;
