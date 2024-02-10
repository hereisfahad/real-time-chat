import prisma from "@/lib/prismadb";

import getCurrentUser from "./getCurrentUser";

const getRooms = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return [];
    }
    const rooms = await prisma.room.findMany({
      orderBy: {
        lastMessageAt: 'desc',
      },
      where: {
        userIds: {
          has: currentUser.id
        }
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          }
        },
      }
    });

    return rooms;
  } catch (error: any) {
    return [];
  }
};

export default getRooms;
