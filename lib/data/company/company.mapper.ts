import { CompanySummaryDTO } from "./company.dto";
import { CompanySummaryType } from "./company.select";

export function mapCompanySummaryToDTO(
  company: CompanySummaryType,
): CompanySummaryDTO {
  return {
    id: company.id,
    name: company.name,
  };
}
