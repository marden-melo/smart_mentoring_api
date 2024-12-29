import { Client, Product } from '@prisma/client';
import {
  ClientCreateInput,
  ClientSearchQuery,
  ClientUpdateInput,
} from '../dtos/clientDTO';

export interface IClientRepository {
  createClient(data: ClientCreateInput): Promise<Client>;
  updateClient(
    clientId: string,
    data: ClientUpdateInput,
  ): Promise<Client | null>;
  deleteClient(clientId: string): Promise<Client | null>;
  getClientById(clientId: string): Promise<Client | null>;
  getClients(query?: ClientSearchQuery): Promise<Client[]>;
  findAllWithPagination(limit: number, offset: number): Promise<Client[]>;
  countClients(): Promise<number>;
}
