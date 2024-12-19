"use client";

import Spinner from "@/components/Spinner";

import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/actions/auth/login";
import { loginSchema } from "@/schemas";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<boolean>(false);
  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    startTransition(() => {
      login(values).then((data) => {
        if (data?.success) {
          form.reset();
          router.push("/");
          router.refresh();

          toast({
            variant: "default",
            description: data.success,
          });
        }

        if (data?.twoFactor) {
          toast({
            variant: "default",
            description: data.twoFactor,
          });
          setShowTwoFactor(true);
        }

        if (data?.error) {
          if (data?.error === "Invalid code!") {
            toast({
              variant: "destructive",
              description: data.error,
            });

            return;
          }
          form.reset();

          toast({
            variant: "destructive",
            description: data.error,
          });
        }
      });
      // .catch(() => {
      //   toast({
      //     variant: "destructive",
      //     description: "Something went wrong!",
      //   });
      // });
    });
  };

  useEffect(() => {
    if (searchParams.get("error") === "OAuthAccountNotLinked") {
      setError(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        description: "Email already in use with credential provider!",
      });
      router.push("/login");
    }
  }, [error, router, toast]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 md:space-y-4"
      >
        {!showTwoFactor && (
          <>
            <FormField
              disabled={isPending}
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              disabled={isPending}
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </>
        )}

        {showTwoFactor && (
          <FormField
            disabled={isPending}
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="w-full flex items-center justify-center">
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        )}

        <Button disabled={isPending} type="submit" className="w-full">
          {isPending ? <Spinner /> : showTwoFactor ? "Confirm" : "Login"}
        </Button>
      </form>
    </Form>
  );
};
export default LoginForm;
