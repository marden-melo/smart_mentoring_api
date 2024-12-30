import { injectable, inject } from 'tsyringe';
import { CustomFieldRepository } from '../repositories/prisma/customFieldRepository';
import { UpdateCustomFieldDTO, CustomFieldDTO } from '../dtos/customFieldDTO';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

@injectable()
export class UpdateCustomFieldUseCase {
  constructor(
    @inject('CustomFieldRepository')
    private customFieldRepository: CustomFieldRepository,
  ) {}

  async execute(
    id: string,
    data: UpdateCustomFieldDTO,
  ): Promise<CustomFieldDTO> {
    const findCustomFieldId = await this.customFieldRepository.findById(id);

    if (!findCustomFieldId) {
      throw new ResourceNotFoundError('CustomField not found');
    }

    const customField = await this.customFieldRepository.update(id, data);

    return customField;
  }
}
