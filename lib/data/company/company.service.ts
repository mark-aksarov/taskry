import { getAllCompanies } from "./company.dal";
import { CompanySummaryDTO } from "./company.dto";

export const getCompanySummaries = async (): Promise<CompanySummaryDTO[]> => {
  const companies = await getAllCompanies();

  return companies.map((c) => {
    return {
      id: c.id,
      name: c.name,
    };
  });
};
