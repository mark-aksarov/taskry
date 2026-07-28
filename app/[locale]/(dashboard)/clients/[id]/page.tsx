import { notFound } from "next/navigation";
import { clientId } from "@/lib/schemas/client";
import { ClientDetailPage } from "./ClientDetailPage";
import { getClient } from "@/lib/data/client/client.dal";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { LinkSearchContainer } from "@/dashboard/common/LinkSearchContainer";
import { ClientDetailActions } from "@/dashboard/client/ClientDetailActions";
import { ClientDetailAltContainer } from "@/dashboard/client/ClientDetailAltContainer";
import { ClientDetailHeaderAltContainer } from "@/dashboard/client/ClientDetailHeaderAltContainer";
import { UpdateClientCompanyFormContainer } from "@/dashboard/client/UpdateClientCompanyFormContainer";

export default async function AppClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireFullAccess();

  // Parse and validate
  const { id: rawClientId } = await params;

  const parsed = clientId.safeParse(rawClientId);
  if (!parsed.success) {
    notFound();
  }
  const id = parsed.data;

  // Get client data
  const client = await getClient(id);

  if (!client) {
    notFound();
  }

  return (
    <ClientDetailPage
      client={client}
      clientDetailContainer={<ClientDetailAltContainer clientId={id} />}
      clientDetailHeaderContainer={
        <ClientDetailHeaderAltContainer clientId={id} />
      }
      clientDetailActions={<ClientDetailActions />}
      updateClientCompanyFormContainer={
        <UpdateClientCompanyFormContainer
          clientId={client.id}
          companyId={client.companyId}
        />
      }
      searchContainer={<LinkSearchContainer pathname="/tasks" />}
    />
  );
}
