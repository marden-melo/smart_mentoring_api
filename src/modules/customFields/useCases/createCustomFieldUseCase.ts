import { injectable, inject } from 'tsyringe';
import { CustomFieldRepository } from '../repositories/prisma/customFieldRepository';
import { CreateCustomFieldDTO, CustomFieldDTO } from '../dtos/customFieldDTO';

@injectable()
export class CreateCustomFieldUseCase {
  constructor(
    @inject('CustomFieldRepository')
    private customFieldRepository: CustomFieldRepository,
  ) {}

  async execute(data: CreateCustomFieldDTO): Promise<CustomFieldDTO> {
    const customField = await this.customFieldRepository.create(data);

    return customField;
  }
}
