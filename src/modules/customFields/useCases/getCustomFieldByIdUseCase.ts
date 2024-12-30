import { injectable, inject } from 'tsyringe';
import { CustomFieldRepository } from '../repositories/prisma/customFieldRepository';
import { CustomFieldDTO } from '../dtos/customFieldDTO';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

@injectable()
export class GetCustomFieldByIdUseCase {
  constructor(
    @inject('CustomFieldRepository')
    private customFieldRepository: CustomFieldRepository,
  ) {}

  async execute(id: string): Promise<CustomFieldDTO | null> {
    const customField = await this.customFieldRepository.findById(id);

    if (!customField) {
      throw new ResourceNotFoundError();
    }

    return customField;
  }
}
