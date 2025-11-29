"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "../ui";
import { Mail } from "lucide-react";

export function SendVerificationButton({ email }: { email: string }) {
  const sendVerificationEmail = async () => {
    await authClient.sendVerificationEmail({
      email,
      callbackURL: "/",
    });
  };

  return (
    <Button
      variant="outlined"
      className="justify-center py-4"
      onPress={sendVerificationEmail}
      iconLeft={<Mail size={18} strokeWidth={1.5} absoluteStrokeWidth />}
      label="Send again"
      size="medium"
    />
  );
}
