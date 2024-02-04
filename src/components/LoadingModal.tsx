import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

const LoadingModal = () => {
  return (
    <Dialog open={true}>
      <DialogContent className="fixed inset-0 z-10 overflow-y-auto">
        <div className="">
          Spinner Icon
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LoadingModal;
