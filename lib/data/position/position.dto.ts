import { Position } from "@/generated/prisma/browser";

export type PositionDTO = {
  id: number;
  name: string;
};

export interface CreatePositionInputDTO {
  name: string;
}

export interface UpdatePositionInputDTO {
  id: number;
  name: string;
}

export function mapToPositionDTO(
  position: Pick<Position, "id" | "name">,
): PositionDTO {
  return {
    id: position.id,
    name: position.name,
  };
}
