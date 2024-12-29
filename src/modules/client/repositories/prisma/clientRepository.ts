import { PrismaClient, Client, Product } from '@prisma/client';
import { IClientRepository } from '../IClientRepository';
import { prisma } from '@/lib/prisma';
import {
  ClientCreateInput,
  ClientUpdateInput,
  ClientSearchQuery,
} from '../../dtos/clientDTO';

export class ClientRepository implements IClientRepository {
  async createClient(data: ClientCreateInput): Promise<Client> {
    return prisma.client.create({
      data,
    });
  }

  async updateClient(
    clientId: string,
    data: ClientUpdateInput,
  ): Promise<Client | null> {
    return prisma.client.update({
      where: { id: clientId },
      data,
    });
  }

  async deleteClient(clientId: string): Promise<Client | null> {
    return prisma.client.delete({
      where: { id: clientId },
    });
  }

  async getClientById(clientId: string): Promise<Client | null> {
    return prisma.client.findUnique({
      where: { id: clientId },
    });
  }

  async getClients(query?: ClientSearchQuery): Promise<Client[]> {
    const { cnpj, cpf, email, name } = query || {};

    return prisma.client.findMany({
      where: {
        cnpj,
        cpf,
        email,
        OR: [
          {
            fullName: name
              ? { contains: name, mode: 'insensitive' }
              : undefined,
          },
          {
            companyName: name
              ? { contains: name, mode: 'insensitive' }
              : undefined,
          },
        ],
      },
    });
  }

  async findAllWithPagination(
    limit: number,
    offset: number,
  ): Promise<Client[]> {
    const client = await prisma.client.findMany({
      skip: offset,
      take: limit,
    });
    return client;
  }

  async countClients(): Promise<number> {
    const total = await prisma.client.count();
    return total;
  }
}
