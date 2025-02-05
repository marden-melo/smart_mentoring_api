import { injectable, inject } from 'tsyringe';
import { hash } from 'bcryptjs';
import { UsersRepository } from '../repositories/prisma/usersRepository';
import { UserAlreadyExistsError } from '@/utils/errors/userAlreadyExistsError';
import { CreateUserDTO } from '../dtos/usersDTO';
import { RoleRepository } from '@/modules/role/repositories/prisma/roleRepository';

@injectable()
export class RegisterUsersUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepository,
    @inject('RoleRepository') private roleRepository: RoleRepository,
  ) {}

  async execute({ email, name, password, roleId }: CreateUserDTO) {
    if (!password) {
      throw new Error('Password is required');
    }

    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const userRole = roleId || 'USER';
    const role = await this.roleRepository.findById(userRole);
    if (!role) {
      throw new Error('Role not found');
    }

    const password_hash = await hash(password, 6);

    const user = await this.usersRepository.create({
      name,
      email,
      password: password_hash,
      role: { connect: { id: role.id } },
    });

    return {
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.role.id,
        roleName: user.role.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }
}
