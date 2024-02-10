import { ArrowPathIcon } from "@heroicons/react/24/solid";

const LoadingModal = () => {
  return (
    <div className="fixed z-[100] inset-0 w-full h-full bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <ArrowPathIcon className="animate-spin rounded-full h-6 w-6" />
    </div>
  )
}

export default LoadingModal;
