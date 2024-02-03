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
    <div className="flex flex-row bg-white rounded-3xl overflow-clip shadow-xl">
      {/* Cover Image */}
      <div className="w-1/2 overflow-hidden flex-grow">
        <img
          src="/signup.png"
          alt="background"
          className="object-cover w-full h-full scale-105"
        />
      </div>
      {/* Sign In Container */}
      <div className="w-1/2 flex justify-center items-center p-[48px]">
        <div className="flex w-full h-full flex-col space-y-[32px]">
          <h1 className="text-5xl text-secondary-500 font-extrabold">ClassHub</h1>
          <div className="flex-col">
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
                  Sign Up
                </Button>
              </form>
            </FormProvider>
            <GoogleSignInButton isSignUp />
            {submissionError && (
              <div className="mt-2 text-red-500">{submissionError}</div>
            )}
          </div>
          {/* Sign Up Offer */}
          <div className="flex items-center justify-center space-x-[10px]">
            <p className="text-gray-500 font-light text-sm">Already have an account?</p>
            <a href="/auth/signin" className="text-blue-500 underline font-medium text-sm">Sign in now</a>
          </div>
        </div>
      </div>
    </div>
  );
}
