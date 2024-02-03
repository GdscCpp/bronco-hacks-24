"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "@/components/input/form-input";
import { ROUTES } from "@/config/routes";
import GoogleSignInButton from "@/components/button/g-signin";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default function SignInPage() {
  const supabase = createClient();
  const router = useRouter();
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof signInSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      setSubmissionError(error.message);
      return;
    }

    router.push(ROUTES.HOME);
  };

  return (
    <>
      <Card className="flex overflow-hidden out bg-white">
        <div className="w-1/2">
          <img
            src="/signup.png"
            alt="background"
            className={"object-cover rounded-r-none rounded-xl"}
          />
        </div>
        <div className="w-1/2 bg-white">
          <CardHeader>
            <h1 className={"text-5xl text-secondary-500"}>ClassHub</h1>
            <h2 className={"text-2xl text-black pt-5"}>
              Nice to see you again
            </h2>
          </CardHeader>
          <CardContent className="text-black">
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormInput
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  className="bg-white"
                />
                <FormInput
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                />

                <Button className="mt-2" type="submit">
                  Sign in
                </Button>
              </form>
            </FormProvider>
            <GoogleSignInButton isSignUp={false} />
            {submissionError && (
              <div className="mt-2 text-red-500">{submissionError}</div>
            )}
          </CardContent>
        </div>
      </Card>
    </>
  );
}
