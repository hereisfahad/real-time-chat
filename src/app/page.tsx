import Image from 'next/image'

import AuthForm from '@/components/AuthForm'

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          height="4"
          width="4"
          className="w-20 h-20 mx-auto"
          src="/next.svg"
          alt="Next.js Logo"
        />
      </div>
      <AuthForm />
    </div>
  )
}
