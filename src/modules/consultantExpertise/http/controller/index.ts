import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import { consultantExpertiseSchema } from '../../validators/consultantExpertiseValidator';
import { CreateConsultantExpertiseUseCase } from '../../useCases/createConsultantExpertiseUseCase';
import { GetAllConsultantExpertiseUseCase } from '../../useCases/getAllConsultantExpertiseUseCase';
import { GetConsultantExpertiseByIdUseCase } from '../../useCases/getConsultantExpertiseByIdUseCase';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { DeleteMentorExpertiseUseCase } from '../../useCases/deleteMentorExpertiseUseCase';

export async function createConsultantExpertiseController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { expertiseId, consultantId } = consultantExpertiseSchema.parse(
      request.body,
    );

    const createConsultantExpertiseUseCase = container.resolve(
      CreateConsultantExpertiseUseCase,
    );

    const consultantExpertiseAreaData =
      await createConsultantExpertiseUseCase.execute({
        expertiseId,
        consultantId,
      });

    reply.status(201).send({
      message: 'Expertise Area created successfully',
      consultantExpertiseAreaData,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getAllConsultantExpertiseController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllConsultantExpertiseUseCase = container.resolve(
      GetAllConsultantExpertiseUseCase,
    );
    const { data: consultantExpertise, total } =
      await getAllConsultantExpertiseUseCase.execute();

    reply.status(200).send({
      total,
      data: consultantExpertise,
    });
  } catch (e) {
    console.error('Error caught:', e);
    const error = e as Error;
    return reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getConsultantExpertiseByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };

    const getConsultantExpertiseByIdUseCase = container.resolve(
      GetConsultantExpertiseByIdUseCase,
    );

    const consultantExpertise =
      await getConsultantExpertiseByIdUseCase.execute(id);

    reply.status(200).send({ data: consultantExpertise });
  } catch (e) {
    const error = e as Error;
    console.error('Error:', e);
    if (e instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}
