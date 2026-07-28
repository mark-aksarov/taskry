import { PositionsPage } from "./PositionsPage";
import { getPositions } from "@/lib/data/position/position.dal";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { PositionsContainer } from "@/dashboard/position/PositionsContainer";
import { LinkSearchContainer } from "@/dashboard/common/LinkSearchContainer";

export default async function AppPositionsPage() {
  // Authorization
  await requireFullAccess();

  const positions = await getPositions();

  return (
    <PositionsPage
      totalCount={positions.length}
      selectedItems={positions.map((p) => ({ id: p.id }))}
      positionsContainer={<PositionsContainer />}
      searchContainer={<LinkSearchContainer pathname="/tasks" />}
    />
  );
}
