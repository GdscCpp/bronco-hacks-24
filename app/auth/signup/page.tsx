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
import { NewUser } from "@/supabase/helper";
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
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    if (error) {
      setSubmissionError(error.message);
      return;
    }

    const body: NewUser = {
      uuid: data.user?.id!,
      email: data.user?.email!,
    };

    const newUser = await supabase.from("users").insert<NewUser>(body);

    if (newUser.error) {
      setSubmissionError(newUser.error.message);
      return;
    }

    router.push(ROUTES.HOME);
  };

  return (
    <>
      <Card className={"w-1/2"}>
        <CardHeader>Sign Up</CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormInput
                name="email"
                label="Email"
                placeholder="Enter your email"
              />
              <FormInput
                name="password"
                label="Password"
                placeholder="Enter your password"
              />

              <Button className="mt-2" type="submit">
                Sign Up
              </Button>
            </form>
          </FormProvider>
          <GoogleSignInButton isSignUp />
          {submissionError && (
            <div className="mt-2 text-red-500">{submissionError}</div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
