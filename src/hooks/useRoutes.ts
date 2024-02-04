import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from 'react-icons/hi';
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2';
import { signOut } from "next-auth/react";

import useRoom from "./useRoom";

const useRoutes = () => {
  const pathname = usePathname();
  const { roomId } = useRoom();

  const routes = useMemo(() => [
    { 
      label: 'Chat', 
      href: '/rooms', 
      icon: HiChat,
      active: pathname === '/rooms' || !!roomId
    },
    { 
      label: 'Users', 
      href: '/users', 
      icon: HiUsers, 
      active: pathname === '/users'
    },
    {
      label: 'Logout', 
      onClick: () => signOut(),
      href: '#',
      icon: HiArrowLeftOnRectangle, 
    }
  ], [pathname, roomId]);

  return routes;
};

export default useRoutes;
