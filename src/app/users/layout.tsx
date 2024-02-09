import { ReactNode } from "react";

import getUsers from "@/actions/getUsers";
import Sidebar from "@/components/sidebar/Sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable";
import UserList from "./components/UserList";

export default async function UsersLayout({
  children
}: {
  children: ReactNode,
}) {
  const users = await getUsers();

  return (
    <Sidebar>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={25} maxSize={40} minSize={25}>
          <div className="h-screen">
            <UserList items={users} />
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
