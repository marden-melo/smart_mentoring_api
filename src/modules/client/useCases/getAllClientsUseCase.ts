import { injectable, inject } from 'tsyringe';
import { ClientRepository } from '../repositories/prisma/clientRepository';
import { Client, User } from '@prisma/client';

@injectable()
export class GetAllClienstUseCase {
  constructor(
    @inject('ClientRepository') private clientRepository: ClientRepository,
  ) {}

  async execute(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;

    const clients: Client[] = await this.clientRepository.findAllWithPagination(
      limit,
      offset,
    );
    const total = await this.clientRepository.countClients();

    return {
      data: clients,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
