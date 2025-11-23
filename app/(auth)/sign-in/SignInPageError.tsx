import { Button } from "@/components/ui";
import { LogIn, Mail } from "lucide-react";
import { BetterFetchError } from "better-auth/react";
import { AuthCard, AuthCardHeader } from "@/components/auth";
import { AuthCardBody } from "@/components/auth/AuthCardBody";
import { AuthCardFooter } from "@/components/auth/AuthCardFooter";
import { AuthCardHeading } from "@/components/auth/AuthCardHeading";
import { AuthCardSubtitle } from "@/components/auth/AuthCardSubtitle";
import { AuthCardFooterItem } from "@/components/auth/AuthCardFooterItem";
import { AuthCardFooterText } from "@/components/auth/AuthCardFooterText";
import { AuthCardFooterLink } from "@/components/auth/AuthCardFooterLink";

interface SignInPageErrorProps {
  error: BetterFetchError & Record<string, any>;
  sendVerificationEmail: () => Promise<void>;
}

export function SignInPageError({
  error,
  sendVerificationEmail,
}: SignInPageErrorProps) {
  return (
    <AuthCard>
      <AuthCardHeader>
        <AuthCardHeading>
          {error.message || "Something went wrong"}
        </AuthCardHeading>
        <AuthCardSubtitle>
          {error.code === "EMAIL_NOT_VERIFIED"
            ? "We sent a verification link to your email. Please check your inbox and click the link to continue"
            : "Something went wrong. Please check your internet or try again"}
        </AuthCardSubtitle>
      </AuthCardHeader>
      <AuthCardBody>
        {error.code === "EMAIL_NOT_VERIFIED" ? (
          <Button
            variant="outlined"
            className="justify-center py-4"
            onClick={sendVerificationEmail}
            iconLeft={<Mail size={18} strokeWidth={1.5} absoluteStrokeWidth />}
            label="Send again"
            size="medium"
          />
        ) : (
          <Button
            variant="outlined"
            className="justify-center py-4"
            onClick={sendVerificationEmail}
            iconLeft={<LogIn size={18} strokeWidth={1.5} absoluteStrokeWidth />}
            label="Sign in with email"
            size="medium"
          />
        )}
      </AuthCardBody>
      <AuthCardFooter>
        <AuthCardFooterItem>
          <AuthCardFooterText>
            Start by creating your account.
          </AuthCardFooterText>
          <AuthCardFooterLink href="#">Sign Up</AuthCardFooterLink>
        </AuthCardFooterItem>
      </AuthCardFooter>
    </AuthCard>
  );
}
