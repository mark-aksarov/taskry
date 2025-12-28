import { getAllPositions } from "./position.dal";
import { PositionSummaryDTO } from "./position.dto";

export const getPositionSummaries = async (): Promise<PositionSummaryDTO[]> => {
  const positions = await getAllPositions();

  return positions.map((p) => {
    return {
      id: p.id,
      name: p.name,
    };
  });
};
