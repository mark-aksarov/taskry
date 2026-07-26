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
