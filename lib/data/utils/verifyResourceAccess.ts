import { requireActiveOrganization } from "@/lib/utils/requireActiveOrganization";
import { requireSession } from "@/lib/utils/requireSession";

export async function verifyResourceAccess() {
  await requireSession();
  return await requireActiveOrganization();
}
