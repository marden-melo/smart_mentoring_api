import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import createClientSchema from '../../validators/clientValidator';
import { CreateClientUseCase } from '../../useCases/createClientUseCase';
import { GetAllClienstUseCase } from '../../useCases/getAllClientsUseCase';
import { GetClientByIdUseCase } from '../../useCases/getClientByIdUseCase';
import { UpdateClientUseCase } from '../../useCases/updateClientUseCase';
import { DeleteClientUseCase } from '../../useCases/deleteClientUseCase';
import { ClientUpdateInput } from '../../dtos/clientDTO';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

export async function createClientController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const {
      clientType,
      email,
      phone,
      cep,
      city,
      cnpj,
      companyName,
      cpf,
      district,
      fullName,
      number,
      responsable,
      state,
      street,
    } = createClientSchema.parse(request.body);

    if (clientType === 'COMPANY') {
      if (!cnpj || cpf) {
        throw new Error(
          'Para empresas, CNPJ é obrigatório e CPF não deve ser informado.',
        );
      }
    } else if (clientType === 'INDIVIDUAL') {
      if (!cpf || cnpj) {
        throw new Error(
          'Para pessoas físicas, CPF é obrigatório e CNPJ não deve ser informado.',
        );
      }
      if (cpf.length !== 11) {
        throw new Error('CPF deve ter 11 caracteres.');
      }
    } else {
      throw new Error('Tipo de cliente inválido.');
    }

    const createClientUseCase = container.resolve(CreateClientUseCase);

    const client = await createClientUseCase.execute({
      clientType,
      email,
      phone,
      cep,
      city,
      cnpj,
      companyName,
      cpf,
      district,
      fullName,
      number,
      responsable,
      state,
      street,
    });

    reply
      .status(201)
      .send({ message: 'Client created successfully', data: client });
  } catch (e: any) {
    console.error('Erro na criação do cliente:', e);
    reply.status(400).send({ error: e.message });
  }
}

export async function getAllClientsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllClientsUseCase = container.resolve(GetAllClienstUseCase);
    const { data: clients, total } = await getAllClientsUseCase.execute();

    reply.status(200).send({
      total,
      data: clients,
    });
  } catch (e) {
    console.error('Error caught:', e);
    const error = e as Error;
    return reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getClientByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };
    const getClientByIdUseCase = container.resolve(GetClientByIdUseCase);
    const client = await getClientByIdUseCase.execute(id);

    reply.status(200).send({ data: client });
  } catch (e) {
    console.error('Error caught:', e);
    const error = e as Error;
    return reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function updateClientController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };
    const data = request.body as Partial<ClientUpdateInput>;

    const updateClientUseCase = container.resolve(UpdateClientUseCase);
    const updatedClient = await updateClientUseCase.execute(id, data);

    reply
      .status(200)
      .send({ message: 'User updated successfully', data: updatedClient });
  } catch (e) {
    console.error('Error caught:', e);
    if (e instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: e.message });
    }
    const error = e as Error;
    return reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function deleteClientController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };

    const deleteClientUseCase = container.resolve(DeleteClientUseCase);
    await deleteClientUseCase.execute(id);

    reply.status(200).send({ message: 'Client deleted successfully' });
  } catch (e) {
    console.error('Error caught:', e);
    if (e instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: e.message });
    }
    const error = e as Error;
    return reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}
