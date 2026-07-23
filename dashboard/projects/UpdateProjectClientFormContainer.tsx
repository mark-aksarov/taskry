"use client";

import {
  UpdateProjectClientForm,
  UpdateProjectClientFormSkeleton,
} from "./UpdateProjectClientForm";

import useSWR from "swr";
import { ClientSummaryDTO } from "@/lib/data/client/client.dto";

interface UpdateProjectClientFormContainerProps {
  projectId: number;
  clientId?: number;
}

export function UpdateProjectClientFormContainer({
  projectId,
  clientId,
}: UpdateProjectClientFormContainerProps) {
  const { data: clients } = useSWR<ClientSummaryDTO[]>("/api/clients");

  // Show skeleton while loading
  if (!clients) {
    return <UpdateProjectClientFormSkeleton />;
  }

  return (
    <UpdateProjectClientForm
      projectId={projectId}
      clientId={clientId}
      clientSelectItems={clients}
    />
  );
}
