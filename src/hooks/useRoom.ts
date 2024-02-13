import { useParams } from "next/navigation";

const useRoom = () => {
  const params = useParams();

  const roomId = params?.roomId ?? "" as string

  return {
    isOpen: !!roomId as Boolean,
    roomId
  }
};

export default useRoom;
