"use client";

import { BASE_URL } from "@/config/constants";
import { API_ROUTES } from "@/config/routes";
import { createClient } from "@/utils/supabase/client";
import { Button } from "../ui/button";

export interface GoogleSignInButtonProps {
  isSignUp?: boolean;
}

export default function GoogleSignInButton({
  isSignUp,
}: GoogleSignInButtonProps) {
  const signInWithGoogle = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${BASE_URL}${API_ROUTES.AUTH_CALLBACK}?isSignup=${isSignUp}`,
      },
    });
  };

  return (
    <Button
      onClick={signInWithGoogle}
      className="flex items-center justify-center px-4 py-2 font-semibold mt-4 rounded-lg bg-black text-white p-2 cursor-pointer border-2 border-gray-200 hover:opacity-70 active:bg-gray-200"
    >
      <div className="flex flex-row space-x-[15px] items-center">
        <img
          src="/google-icon.png"
          alt="Google Icon"
          className="w-4 h-4 object-scale-down"
        />
        <p>
          Continue with Google
        </p>
      </div>
    </Button>
  );
}
