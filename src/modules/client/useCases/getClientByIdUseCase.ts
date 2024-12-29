import { injectable, inject } from 'tsyringe';
import { ClientRepository } from '../repositories/prisma/clientRepository';
import { UserNotFoundError } from '@/utils/errors/userNotFoundError';

@injectable()
export class GetClientByIdUseCase {
  constructor(
    @inject('ClientRepository') private clientRepository: ClientRepository,
  ) {}

  async execute(id: string) {
    const client = await this.clientRepository.getClientById(id);

    if (!client) {
      throw new UserNotFoundError();
    }

    return client;
  }
}
