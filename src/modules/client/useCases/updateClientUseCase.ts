import { injectable, inject } from 'tsyringe';
import { ClientRepository } from '../repositories/prisma/clientRepository';
import { Client } from '@prisma/client';
import { ClientUpdateInput } from '../dtos/clientDTO';

@injectable()
export class UpdateClientUseCase {
  constructor(
    @inject('ClientRepository') private clientRepository: ClientRepository,
  ) {}

  async execute(id: string, data: Partial<ClientUpdateInput>): Promise<Client> {
    const updatedClient = await this.clientRepository.updateClient(id, data);

    if (!updatedClient) {
      throw new Error('Client not found');
    }

    return updatedClient;
  }
}
