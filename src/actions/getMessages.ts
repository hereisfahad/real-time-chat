import prisma from "@/lib/prismadb";

const getMessages = async (
  roomId: string
) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        roomId
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    return messages;
  } catch (error: any) {
    return [];
  }
};

export default getMessages;
