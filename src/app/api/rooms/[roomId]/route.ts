import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";

interface IParams {
  roomId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { roomId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return NextResponse.json(null);
    }

    const existingRoom = await prisma.room.findUnique({
      where: {
        id: roomId
      },
      include: {
        users: true
      }
    });

    if (!existingRoom) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    const deletedRoom = await prisma.room.deleteMany({
      where: {
        id: roomId,
        userIds: {
          hasSome: [currentUser.id]
        },
      },
    });

    existingRoom.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, 'room:remove', existingRoom);
      }
    });

    return NextResponse.json(deletedRoom)
  } catch (error) {
    return NextResponse.json(null);
  }
}
