import { Button, Checkbox, TextField } from "@/components/ui";
import { AuthCard, AuthCardHeader } from "@/components/auth";
import { AuthCardBody } from "@/components/auth/AuthCardBody";
import { AuthCardForm } from "@/components/auth/AuthCardForm";
import { AuthCardFooter } from "@/components/auth/AuthCardFooter";
import { AuthCardHeading } from "@/components/auth/AuthCardHeading";
import { AuthCardSubtitle } from "@/components/auth/AuthCardSubtitle";
import { AuthCardFooterItem } from "@/components/auth/AuthCardFooterItem";
import { AuthCardFooterText } from "@/components/auth/AuthCardFooterText";
import { AuthCardFooterLink } from "@/components/auth/AuthCardFooterLink";

interface SignUpPageProps {
  name: string;
  email: string;
  password: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  isSubmitting: boolean;
  setIsSubmitting: (setIsSubmitting: boolean) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function SignUpPage({
  name,
  email,
  password,
  setName,
  setEmail,
  setPassword,
  isSubmitting,
  setIsSubmitting,
  handleSubmit,
}: SignUpPageProps) {
  return (
    <AuthCard>
      <AuthCardHeader>
        <AuthCardHeading>Sign Up</AuthCardHeading>
        <AuthCardSubtitle>Please sign in to your account.</AuthCardSubtitle>
      </AuthCardHeader>
      <AuthCardBody>
        <AuthCardForm onSubmit={handleSubmit}>
          <TextField
            label="Name"
            placeholder="Enter your name"
            value={name}
            onChange={setName}
          />
          <TextField
            label="Email"
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
          <Checkbox className="font-normal">Remember me</Checkbox>
        </AuthCardForm>
        <Button size="medium" label="Sign Up" className="justify-center py-4" />
      </AuthCardBody>
      <AuthCardFooter>
        <AuthCardFooterItem>
          <AuthCardFooterText>
            Please sign in to your account.
          </AuthCardFooterText>
          <AuthCardFooterLink href="#">Sign In</AuthCardFooterLink>
        </AuthCardFooterItem>
        <AuthCardFooterItem>
          <AuthCardFooterLink href="#">Forgot password?</AuthCardFooterLink>
        </AuthCardFooterItem>
      </AuthCardFooter>
    </AuthCard>
  );
}
