"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabase/client";

export function AuthForm() {
  return (
    <div className="w-full max-w-md mx-auto p-6">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["google", "github"]}
        redirectTo={`${window.location.origin}/auth/callback`}
        theme="default"
      />
    </div>
  );
}