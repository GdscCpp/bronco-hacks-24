"use client";

import { BASE_URL } from "@/config/constants";
import { API_ROUTES } from "@/config/routes";
import { createClient } from "@/utils/supabase/client";

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
    <button
      onClick={signInWithGoogle}
      className="flex items-center justify-center px-4 py-2 font-semibold text-black p-2 rounded cursor-pointer border-2 border-gray-200 hover:opacity-70 active:bg-gray-200"
    >
      Continue with Google
    </button>
  );
}
