import { ConsultantExpertiseDTO } from '../dtos/consultantExpertiseDTO';

export interface IConsultantExpertiseRepository {
  create(data: ConsultantExpertiseDTO): Promise<ConsultantExpertiseDTO>;
  getAll(): Promise<ConsultantExpertiseDTO[]>;
  findByConsultantId(consultantId: string): Promise<ConsultantExpertiseDTO[]>;
  delete(consultantId: string, expertiseId: string): Promise<void>;
  findAllWithPagination(
    limit: number,
    offset: number,
  ): Promise<ConsultantExpertiseDTO[]>;
  count(): Promise<number>;
}
