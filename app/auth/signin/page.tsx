"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Form, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";
import FormInput from "@/components/input/form-input";

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
      <Card className={"w-1/2"}>
        <CardHeader>Sign In</CardHeader>
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
                Sign In
              </Button>
            </form>
          </FormProvider>
          {submissionError && (
            <div className="mt-2 text-red-500">{submissionError}</div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
