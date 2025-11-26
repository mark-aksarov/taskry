import { AuthCard, AuthCardHeader } from "@/components/auth";
import { Button, Checkbox, TextField } from "@/components/ui";
import { AuthCardBody } from "@/components/auth/AuthCardBody";
import { AuthCardForm } from "@/components/auth/AuthCardForm";
import { AuthCardFooter } from "@/components/auth/AuthCardFooter";
import { AuthCardHeading } from "@/components/auth/AuthCardHeading";
import { AuthCardSubtitle } from "@/components/auth/AuthCardSubtitle";
import { AuthCardFooterItem } from "@/components/auth/AuthCardFooterItem";
import { AuthCardFooterText } from "@/components/auth/AuthCardFooterText";
import { AuthCardFooterLink } from "@/components/auth/AuthCardFooterLink";

interface ResetPasswordPageProps {
  password: string;
  setPassword: (password: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function ResetPasswordPage({
  password,
  setPassword,
  handleSubmit,
}: ResetPasswordPageProps) {
  return (
    <AuthCard>
      <AuthCardHeader>
        <AuthCardHeading>Reset password</AuthCardHeading>
        <AuthCardSubtitle>
          Provide a new password for your account.
        </AuthCardSubtitle>
      </AuthCardHeader>
      <AuthCardBody>
        <AuthCardForm onSubmit={handleSubmit}>
          <TextField
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={setPassword}
          />
        </AuthCardForm>
        <Button
          size="medium"
          label="Reset password"
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
