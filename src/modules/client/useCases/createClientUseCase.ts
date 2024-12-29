import { injectable, inject } from 'tsyringe';
import { ClientRepository } from '../repositories/prisma/clientRepository';
import { ClientCreateInput } from '../dtos/clientDTO';
import { Client } from '@prisma/client';

@injectable()
export class CreateClientUseCase {
  constructor(
    @inject('ClientRepository') private clientRepository: ClientRepository,
  ) {}

  async execute(data: ClientCreateInput): Promise<Client> {
    const createdClient = await this.clientRepository.createClient(data);
    return createdClient;
  }
}
