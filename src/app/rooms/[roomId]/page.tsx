import getRoomById from "@/actions/getRoomById";
import getMessages from "@/actions/getMessages";

import EmptyState from "@/components/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";

interface IParams {
  roomId: string;
}

const ChatId = async ({ params }: { params: IParams }) => {
  const room = await getRoomById(params.roomId);
  const messages = await getMessages(params.roomId);

  if (!room) {
    return (
      <div className="h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    )
  }

  return (
    <div className="h-full">
      <div className="h-full flex flex-col">
        <Header room={room} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
}

export default ChatId;
