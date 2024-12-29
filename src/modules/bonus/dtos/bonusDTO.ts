export interface CreateBonusDTO {
  description: string;
  percentage?: number;
  value?: number;
}

export interface GetBonusDTO {
  id: string;
  description: string;
  percentage?: number;
  value?: number | null;
}

export interface UpdateBonusDTO {
  description?: string;
  percentage?: number;
  value?: number;
}
