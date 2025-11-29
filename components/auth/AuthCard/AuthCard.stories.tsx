import { AuthCard } from "./AuthCard";
import { AuthCardBody } from "./AuthCardBody";
import { AuthCardForm } from "./AuthCardForm";
import { AuthCardHeader } from "./AuthCardHeader";
import { AuthCardFooter } from "./AuthCardFooter";
import { AuthCardHeading } from "./AuthCardHeading";
import { AuthCardSubtitle } from "./AuthCardSubtitle";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AuthCardFooterItem } from "./AuthCardFooterItem";
import { AuthCardFooterLink } from "./AuthCardFooterLink";
import { AuthCardFooterText } from "./AuthCardFooterText";
import { Button, Checkbox, TextField } from "@/components/ui";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/auth/AuthCard",
  component: AuthCard,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof AuthCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: (
      <>
        <AuthCardHeader>
          <AuthCardHeading>Sign Up</AuthCardHeading>
          <AuthCardSubtitle>Please sign in to your account.</AuthCardSubtitle>
        </AuthCardHeader>
        <AuthCardBody>
          <AuthCardForm>
            <TextField label="Email" placeholder="Enter your email" />
            <TextField
              label="Password"
              type="password"
              placeholder="Enter your password"
            />
            <TextField
              label="Repeat Password"
              type="password"
              placeholder="Repeat your password"
            />
            <Checkbox className="font-normal">Remember me</Checkbox>
          </AuthCardForm>

          <Button
            size="medium"
            label="Sign Up"
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
          <AuthCardFooterItem>
            <AuthCardFooterLink href="#">Forgot password?</AuthCardFooterLink>
          </AuthCardFooterItem>
        </AuthCardFooter>
      </>
    ),
  },
} satisfies Story;
