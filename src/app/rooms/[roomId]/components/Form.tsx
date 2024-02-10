'use client';

import {
  FieldValues,
  SubmitHandler,
  useForm
} from "react-hook-form";
import axios from "axios";
import useRoom from "@/hooks/useRoom";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

import MessageInput from "./MessageInput";

const Form = () => {
  const { roomId } = useRoom();

  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      message: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true });
    axios.post('/api/messages', {
      ...data,
      roomId: roomId
    })
  }

  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Type a message"
        />
        <button
          type="submit"
          className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition"
        >
          <PaperAirplaneIcon className="text-white w-6 h-6" />
        </button>
      </form>
    </div>
  );
}

export default Form;
