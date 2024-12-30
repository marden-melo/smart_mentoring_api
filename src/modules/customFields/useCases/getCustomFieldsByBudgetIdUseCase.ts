import { injectable, inject } from 'tsyringe';
import { CustomFieldRepository } from '../repositories/prisma/customFieldRepository';
import { CustomFieldDTO } from '../dtos/customFieldDTO';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

@injectable()
export class GetCustomFieldsByBudgetIdUseCase {
  constructor(
    @inject('CustomFieldRepository')
    private customFieldRepository: CustomFieldRepository,
  ) {}

  async execute(budgetId: string): Promise<CustomFieldDTO[]> {
    const customFields =
      await this.customFieldRepository.findByBudgetId(budgetId);

    if (!customFields || customFields.length === 0) {
      throw new ResourceNotFoundError(
        'Custom field not found for this budget.',
      );
    }
    return customFields;
  }
}
