import { injectable, inject } from 'tsyringe';
import { hash } from 'bcryptjs';
import { UsersRepository } from '../repositories/prisma/usersRepository';
import { UserAlreadyExistsError } from '@/utils/errors/userAlreadyExistsError';
import { CreateUserDTO } from '../dtos/usersDTO';
import { RoleRepository } from '@/modules/role/repositories/prisma/roleRepository';
import { PlanRepository } from '@/modules/plan/repositories/prisma/planRepository';

@injectable()
export class RegisterUsersUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepository,
    @inject('RoleRepository') private roleRepository: RoleRepository,
    @inject('PlanRepository') private planRepository: PlanRepository,
  ) {}

  async execute({
    email,
    name,
    password,
    roleId,
    isActive,
    planId,
    testStartDate,
  }: CreateUserDTO) {
    if (!password) {
      throw new Error('Password is required');
    }

    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const role = await this.roleRepository.findById(roleId);
    if (!role) {
      throw new Error('Role not found');
    }

    let plan;
    if (planId) {
      plan = await this.planRepository.findById(planId);
      if (!plan) {
        throw new Error('Plan not found');
      }
    }

    const password_hash = await hash(password, 6);

    const user = await this.usersRepository.create({
      name,
      email,
      password: password_hash,
      isActive,
      testStartDate,
      plan: plan ? { connect: { id: planId } } : undefined,
      role: { connect: { id: roleId } },
    });

    return {
      data: user,
    };
  }
}
