import prisma from "@/lib/prismadb";

import getCurrentUser from "./getCurrentUser";

const getRoomById = async (
  roomId: string
) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      return null;
    }
  
    const room = await prisma.room.findUnique({
      where: {
        id: roomId
      },
      include: {
        users: true,
      },
    });

    return room;
  } catch (error: any) {
    console.log(error)
    return null;
  }
};

export default getRoomById;
