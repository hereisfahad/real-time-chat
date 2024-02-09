import getRooms from "@/actions/getRooms";
import getUsers from "@/actions/getUsers";

import Sidebar from "@/components/sidebar/Sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable";
import RoomList from "./components/RoomList";

export default async function ConversationsLayout({
  children
}: {
  children: React.ReactNode,
}) {
  const conversations = await getRooms();
  const users = await getUsers();

  return (
    <Sidebar>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={25} maxSize={40} minSize={25}>
          <div className="h-screen">
            <RoomList
              users={users}
              title="Messages"
              initialItems={conversations}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75} maxSize={75} minSize={60}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </Sidebar>
  );
}
