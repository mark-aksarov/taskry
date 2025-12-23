import { PositionSummaryDTO } from "./position.dto";
import { PositionSummaryType } from "./position.select";

export function mapPositionSummaryToDTO(
  position: PositionSummaryType,
): PositionSummaryDTO {
  return {
    id: position.id,
    name: position.name,
  };
}
