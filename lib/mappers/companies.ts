import { CompanySummaryDTO } from "../dto/companies";
import { CompanySummaryType } from "../types/companies";

export function mapCompanySummaryToDTO(
  company: CompanySummaryType,
): CompanySummaryDTO {
  return {
    id: company.id,
    name: company.name,
  };
}
