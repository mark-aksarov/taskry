import "server-only";

import {
  TotalClientsCard,
  TotalClientsCardSkeleton,
} from "./TotalClientsCard";
import { Suspense } from "react";
import { getClientCount } from "@/lib/data/client/client.dal";

export const TotalClientsCardContainer = () => {
  return (
    <Suspense fallback={<TotalClientsCardSkeleton />}>
      <TotalClientsCardContainerInner />
    </Suspense>
  );
};

const TotalClientsCardContainerInner = async () => {
  const totalClients = await getClientCount();

  return <TotalClientsCard totalClients={totalClients} />;
};
