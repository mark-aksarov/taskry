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

interface SignInPageProps {
  email: string;
  password: string;
  rememberMe: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setRememberMe: (rememberMe: boolean) => void;
  isSubmitting: boolean;
  setIsSubmitting: (setIsSubmitting: boolean) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function SignInPage({
  email,
  password,
  rememberMe,
  setEmail,
  setPassword,
  setRememberMe,
  isSubmitting,
  setIsSubmitting,
  handleSubmit,
}: SignInPageProps) {
  return (
    <AuthCard>
      <AuthCardHeader>
        <AuthCardHeading>Sign In</AuthCardHeading>
        <AuthCardSubtitle>Please sign in to your account.</AuthCardSubtitle>
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
          <TextField
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={setPassword}
          />
          <TextField
            label="Repeat Password"
            type="password"
            placeholder="Repeat your password"
            value={password}
            onChange={setPassword}
          />
          <Checkbox
            className="font-normal"
            isSelected={rememberMe}
            onChange={setRememberMe}
          >
            Remember me
          </Checkbox>
        </AuthCardForm>
        <Button size="medium" label="Sign Up" className="justify-center py-4" />
      </AuthCardBody>
      <AuthCardFooter>
        <AuthCardFooterItem>
          <AuthCardFooterText>
            Start by creating your account.
          </AuthCardFooterText>
          <AuthCardFooterLink href="#">Sign Up</AuthCardFooterLink>
        </AuthCardFooterItem>
        <AuthCardFooterItem>
          <AuthCardFooterLink href="#">Forgot password?</AuthCardFooterLink>
        </AuthCardFooterItem>
      </AuthCardFooter>
    </AuthCard>
  );
}
