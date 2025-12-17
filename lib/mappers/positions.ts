import { PositionSummaryDTO } from "../dto/positions";
import { PositionSummaryType } from "../types/positions";

export function mapPositionSummaryToDTO(
  position: PositionSummaryType,
): PositionSummaryDTO {
  return {
    id: position.id,
    name: position.name,
  };
}
