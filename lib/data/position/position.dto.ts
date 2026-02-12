export type PositionSummaryDTO = {
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
