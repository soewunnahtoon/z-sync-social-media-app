"use client";

import Spinner from "@/components/Spinner";
import FormSuccess from "@/components/auth/FormSuccess";
import FormError from "@/components/auth/FormError";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { emailVerification } from "@/actions/auth/email-verification";
import { useToast } from "@/hooks/use-toast";

const EmailVerificationForm = () => {
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { toast } = useToast();

  useEffect(() => {
    if (token) {
      emailVerification(token)
        .then((data) => {
          if (data?.success) {
            router.push("/login");
            setSuccess(data?.success);
          }

          if (data?.error) {
            router.push("/login");
            setError(data?.error);
          }
        })
        .catch(() => {
          router.push("/login");
          setError("Something went wrong!");
        });
    } else {
      router.push("/login");
      setError("Missing token!");
    }
  }, [token, router]);

  useEffect(() => {
    if (success) {
      toast({
        variant: "default",
        description: success,
      });
    }

    if (error) {
      toast({
        variant: "destructive",
        description: error,
      });
    }
  }, [success, error, toast]);

  return (
    <>
      {!error && !success && <Spinner />}
      {success && <FormSuccess message={success} />}
      {error && <FormError message={error} />}
    </>
  );
};
export default EmailVerificationForm;
