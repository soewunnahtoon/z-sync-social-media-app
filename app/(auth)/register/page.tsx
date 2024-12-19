import Image from "next/image";
import Link from "next/link";
import registerImage from "@/assets/register-image.jpg";
import RegisterForm from "@/components/auth/RegisterForm";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

const RegisterPage = () => {
  return (
    <main className="flex h-screen items-center justify-center p-4">
      <div className="flex h-full max-h-[44rem] w-full max-w-[68rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-8 overflow-y-auto p-8 md:w-1/2 my-auto md:m-0">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Register to Z-SYNC</h1>
            <p className="text-muted-foreground text-xs md:text-sm">
              A place where even you can find a friend.
            </p>
          </div>

          <div className="space-y-2">
            <RegisterForm />

            <div className="flex items-center justify-center gap-2 text-xs md:text-sm">
              <p>Already have an account?</p>
              <Link href="/login" className="hover:underline">
                Log in
              </Link>
            </div>
          </div>
        </div>

        <Image
          src={registerImage}
          alt="register-image"
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
};
export default RegisterPage;
