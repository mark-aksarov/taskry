import z from "zod";
import { notFound } from "next/navigation";
import { userEmail } from "@/lib/schemas/user";
import { AcceptInvitePage } from "./AcceptInvitePage";
import { requireAuthPage } from "@/lib/utils/requireAuthPage";
import { acceptInvite } from "@/lib/actions/auth/acceptInvite";

const searchParamsSchema = z.object({
  token: z.string().nonempty(),
  email: userEmail,
});

export default async function AppAcceptInvitePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await requireAuthPage();

  // Validation
  const rawParams = await searchParams;
  const parsed = searchParamsSchema.safeParse(rawParams);

  if (!parsed.success) {
    notFound();
  }

  const { token, email } = parsed.data;

  const acceptInviteWithToken = acceptInvite.bind(null, token);

  return (
    <AcceptInvitePage email={email} acceptInvite={acceptInviteWithToken} />
  );
}
