import Image from "next/image";
import Link from "next/link";

import loginImage from "@/assets/login-image.jpg";
import EmailVerificationForm from "@/components/auth/email-verification-form";

import { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Email Verification",
};

const EmailVerificationPage = () => {
  return (
    <main className="flex h-screen items-center justify-center p-4">
      <div className="flex h-full max-h-[44rem] w-full max-w-[68rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-8 overflow-y-auto p-8 md:w-1/2 my-auto">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Email Verification</h1>
            <p className="text-muted-foreground text-xs md:text-sm">
              Email verification for your account
            </p>
          </div>

          <div className="space-y-2">
            <EmailVerificationForm />

            <Button variant="link" asChild className="mx-auto w-full">
              <Link href="/login">Back to login</Link>
            </Button>
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
export default EmailVerificationPage;
