import Image from "next/image";
import Link from "next/link";
import loginImage from "@/assets/login-image.jpg";
import LoginForm from "@/components/auth/LoginForm";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return (
    <main className="flex h-screen items-center justify-center p-4">
      <div className="flex h-full max-h-[44rem] w-full max-w-[68rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-8 overflow-y-auto p-8 md:w-1/2 my-auto">
          <h1 className="text-3xl font-bold text-center">Login to Z-SYNC</h1>

          <div className="space-y-2">
            <LoginForm />

            <div className="flex items-center justify-center gap-2 text-xs md:text-sm">
              <p>Don&apos;t have an account?</p>
              <Link href="/register" className="hover:underline">
                Register
              </Link>
            </div>
          </div>
        </div>

        <Image
          src={loginImage}
          alt="login-image"
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
};
export default LoginPage;
