import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";

export async function POST(
  request: Request,
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 400 });
    }

    const body = await request.json();
    const { userId, isGroup, members, name } = body;

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse('Invalid data', { status: 400 });
    }

    if (isGroup) {
      const newRoom = await prisma.room.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value
              })),
              {
                id: currentUser.id
              }
            ]
          }
        },
        include: {
          users: true,
        }
      });

      // Update all connections with new room
      newRoom.users.forEach((user) => {
        if (user.email) {
          pusherServer.trigger(user.email, 'room:new', newRoom);
        }
      });

      return NextResponse.json(newRoom);
    }

    const existingRoom = await prisma.room.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId]
            }
          },
          {
            userIds: {
              equals: [userId, currentUser.id]
            }
          }
        ]
      }
    });

    const singleRoom = existingRoom[0];

    if (singleRoom) {
      return NextResponse.json(singleRoom);
    }

    const newRoom = await prisma.room.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id
            },
            {
              id: userId
            }
          ]
        }
      },
      include: {
        users: true
      }
    });

    // Update all connections with new room
    newRoom.users.map((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, 'room:new', newRoom);
      }
    });

    return NextResponse.json(newRoom)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
