import { Company } from "@/generated/prisma/browser";

export interface CompanyDTO {
  id: number;
  name: string;
}

export interface CreateCompanyInputDTO {
  name: string;
}

export interface UpdateCompanyInputDTO {
  id: number;
  name: string;
}

export function mapToCompanyDTO(
  company: Pick<Company, "id" | "name">,
): CompanyDTO {
  return {
    id: company.id,
    name: company.name,
  };
}
