import { PositionsPage } from "./PositionsPage";
import { PositionsPageProviders } from "./PositionsPageProviders";
import { getPositionSummaries } from "@/lib/data/position/position.dal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { PositionsContainer } from "@/components/position/PositionsContainer";

export default async function AppPositionsPage() {
  // Authorization
  await requireProtectedPage();

  const positions = await getPositionSummaries();

  return (
    <PositionsPageProviders pageItems={positions.map((p) => ({ id: p.id }))}>
      <PositionsPage
        totalCount={positions.length}
        positionsContainer={<PositionsContainer />}
      />
    </PositionsPageProviders>
  );
}
