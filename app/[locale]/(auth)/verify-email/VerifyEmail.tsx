import { LogIn } from "lucide-react";
import { Button } from "@/components/ui";
import { AuthCard, AuthCardHeader } from "@/components/auth";
import { AuthCardBody } from "@/components/auth/AuthCardBody";
import { AuthCardFooter } from "@/components/auth/AuthCardFooter";
import { AuthCardHeading } from "@/components/auth/AuthCardHeading";
import { AuthCardSubtitle } from "@/components/auth/AuthCardSubtitle";
import { AuthCardFooterItem } from "@/components/auth/AuthCardFooterItem";
import { AuthCardFooterText } from "@/components/auth/AuthCardFooterText";
import { AuthCardFooterLink } from "@/components/auth/AuthCardFooterLink";

interface VerifyEmailProps {
  error?: string;
  email: string;
}

export function VerifyEmail({ error, email }: VerifyEmailProps) {
  return (
    <AuthCard>
      <AuthCardHeader>
        <AuthCardHeading>Verify Email</AuthCardHeading>
        {error && (
          <AuthCardSubtitle className="text-red-600 dark:text-red-400">
            {error}
          </AuthCardSubtitle>
        )}
        <AuthCardSubtitle>
          We have sent a verification link to your {email}. Please check your
          inbox and click the link to continue.
        </AuthCardSubtitle>
      </AuthCardHeader>
      <AuthCardBody>
        <Button
          variant="outlined"
          className="justify-center py-4"
          iconLeft={<LogIn size={18} strokeWidth={1.5} absoluteStrokeWidth />}
          label="Sign in with email"
          size="medium"
        />
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
