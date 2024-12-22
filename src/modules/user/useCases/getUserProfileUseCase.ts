import { injectable, inject } from 'tsyringe';
import { UsersRepository } from '../repositories/prisma/userRepository';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { UserDTO } from '../dtos/usersDTO';

interface GetUserProfileRequest {
  userId: string;
}

@injectable()
export class GetUserProfileUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepository,
  ) {}

  async execute({ userId }: GetUserProfileRequest) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}
