import z from "zod";
import { SignInPage } from "./SignInPage";
import { signIn } from "@/lib/actions/auth/signIn";
import { resetPasswordMode } from "@/lib/schemas/user";
import { requireAuthPage } from "@/lib/utils/requireAuthPage";

const searchParamsSchema = z.object({
  mode: resetPasswordMode.optional(),
});

export default async function AppSignInPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  await requireAuthPage();

  const rawParams = await searchParams;
  const { mode } = searchParamsSchema.parse(rawParams);

  return <SignInPage signIn={signIn} mode={mode} />;
}
