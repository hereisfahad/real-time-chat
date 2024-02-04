import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import getCurrentUser from '@/actions/getCurrentUser';
import DesktopSidebar from './DesktopSidebar';
import MobileFooter from './MobileFooter';

async function Sidebar({ children }: {
  children: React.ReactNode,
}) {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={25} maxSize={50} minSize={20}>
          <DesktopSidebar currentUser={currentUser!} />
        </ResizablePanel>
        <MobileFooter />
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75} maxSize={80} minSize={50}>
          <main className="h-full">
            {children}
          </main>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default Sidebar;
