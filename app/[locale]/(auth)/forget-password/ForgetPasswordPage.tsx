import { Button, TextField } from "@/components/ui";
import { AuthCard, AuthCardHeader } from "@/components/auth";
import { AuthCardBody } from "@/components/auth/AuthCardBody";
import { AuthCardForm } from "@/components/auth/AuthCardForm";
import { AuthCardFooter } from "@/components/auth/AuthCardFooter";
import { AuthCardHeading } from "@/components/auth/AuthCardHeading";
import { AuthCardSubtitle } from "@/components/auth/AuthCardSubtitle";
import { AuthCardFooterItem } from "@/components/auth/AuthCardFooterItem";
import { AuthCardFooterText } from "@/components/auth/AuthCardFooterText";
import { AuthCardFooterLink } from "@/components/auth/AuthCardFooterLink";

interface ForgetPasswordPageProps {
  email: string;
  setEmail: (email: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function ForgetPasswordPage({
  email,
  setEmail,
  handleSubmit,
}: ForgetPasswordPageProps) {
  return (
    <AuthCard>
      <AuthCardHeader>
        <AuthCardHeading>Forgot password?</AuthCardHeading>
        <AuthCardSubtitle>
          Recover your account by requesting a password reset link.
        </AuthCardSubtitle>
      </AuthCardHeader>
      <AuthCardBody>
        <AuthCardForm onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="Email"
            placeholder="Enter your email"
            value={email}
            onChange={setEmail}
          />
        </AuthCardForm>
        <Button
          size="medium"
          label="Request reset link"
          className="justify-center py-4"
        />
      </AuthCardBody>
      <AuthCardFooter>
        <AuthCardFooterItem>
          <AuthCardFooterText>
            Please sign in to your account.
          </AuthCardFooterText>
          <AuthCardFooterLink href="#">Sign In</AuthCardFooterLink>
        </AuthCardFooterItem>
      </AuthCardFooter>
    </AuthCard>
  );
}
