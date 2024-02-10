import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from 'sonner';
import { User } from "@prisma/client";
import Avatar from "@/components/Avatar";
import LoadingModal from "@/components/LoadingModal";

interface UserBoxProps {
  data: User
}

const UserBox: React.FC<UserBoxProps> = ({
  data
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handelCreateRoom = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/rooms', { userId: data.id })
      router.push(`/rooms/${response.data.id}`);
    } catch (error) {
      console.log({ error })
      toast.error('Something went wrong!')
    } finally {
      setIsLoading(false)
    };
  };

  return (
    <>
      {isLoading && (
        <LoadingModal />
      )}
      <div
        onClick={handelCreateRoom}
        className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer"
      >
        <Avatar src={data.image as string} name={data.name as string} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900">
                {data.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserBox;
