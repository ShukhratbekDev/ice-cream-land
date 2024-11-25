import { SignUp } from '@clerk/nextjs';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="relative">
        <Image src="/signUp.jpg" alt={'signUp'} className="object-cover" fill sizes="100vw" />
      </div>
      <div className="flex justify-center items-center h-screen order-first md:order-last">
        <SignUp />
      </div>
    </div>
  );
}
