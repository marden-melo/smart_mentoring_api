import { injectable, inject } from 'tsyringe';
import { CustomFieldRepository } from '../repositories/prisma/customFieldRepository';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

@injectable()
export class DeleteCustomFieldUseCase {
  constructor(
    @inject('CustomFieldRepository')
    private customFieldRepository: CustomFieldRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const customField = await this.customFieldRepository.findById(id);

    if (!customField) {
      throw new ResourceNotFoundError();
    }

    await this.customFieldRepository.delete(id);
  }
}
