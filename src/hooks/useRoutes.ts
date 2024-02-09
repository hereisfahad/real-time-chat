import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { ArrowLeftEndOnRectangleIcon, ChatBubbleOvalLeftEllipsisIcon, UsersIcon } from "@heroicons/react/24/solid";

import useRoom from "./useRoom";

const useRoutes = () => {
  const pathname = usePathname();
  const { roomId } = useRoom();

  const routes = useMemo(() => [
    {
      label: 'Chat',
      href: '/rooms',
      icon: ChatBubbleOvalLeftEllipsisIcon,
      active: pathname === '/rooms' || !!roomId
    },
    {
      label: 'Users',
      href: '/users',
      icon: UsersIcon,
      active: pathname === '/users'
    },
    {
      label: 'Logout',
      onClick: () => signOut(),
      href: '#',
      icon: ArrowLeftEndOnRectangleIcon,
    }
  ], [pathname, roomId]);

  return routes;
};

export default useRoutes;
