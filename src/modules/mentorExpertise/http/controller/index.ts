import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import { mentorExpertiseSchema } from '../../validators/mentorExpertiseValidator';
import { CreateMentorExpertiseUseCase } from '../../useCases/createMentorExpertiseUseCase';
import { GetAllMentorExpertiseUseCase } from '../../useCases/getAllMentorExpertiseUseCase';
import { GetMentorExpertiseByIdUseCase } from '../../useCases/getMentorExpertiseByIdUseCase';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { DeleteMentorExpertiseUseCase } from '../../useCases/deleteMentorExpertiseUseCase';

export async function createMentorExpertiseController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { expertiseId, mentorId } = mentorExpertiseSchema.parse(request.body);

    const createMentorExpertiseUseCase = container.resolve(
      CreateMentorExpertiseUseCase,
    );

    const mentorExpertiseAreaData = await createMentorExpertiseUseCase.execute({
      expertiseId,
      mentorId,
    });

    reply.status(201).send({
      message: 'Expertise Area created successfully',
      mentorExpertiseAreaData,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getAllMentorExpertiseController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllMentorExpertiseUseCase = container.resolve(
      GetAllMentorExpertiseUseCase,
    );
    const { data: mentorExpertise, total } =
      await getAllMentorExpertiseUseCase.execute();

    console.log(mentorExpertise);

    reply.status(200).send({
      total,
      data: mentorExpertise,
    });
  } catch (e) {
    console.error('Error caught:', e);
    const error = e as Error;
    return reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getMentorExpertiseByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };

    const getMentorExpertiseByIdUseCase = container.resolve(
      GetMentorExpertiseByIdUseCase,
    );

    const mentorExpertise = await getMentorExpertiseByIdUseCase.execute(id);

    reply.status(200).send({ data: mentorExpertise });
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

export async function deleteMentorExpertiseController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { mentorId, expertiseId } = request.params as {
      mentorId: string;
      expertiseId: string;
    };

    const deleteMentorExpertiseUseCase = container.resolve(
      DeleteMentorExpertiseUseCase,
    );

    await deleteMentorExpertiseUseCase.execute(mentorId, expertiseId);

    reply
      .status(200)
      .send({ message: 'Mentor Expertise deleted successfully' });
  } catch (e) {
    console.error('Error:', e);
    const error = e as Error;
    if (e instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}
