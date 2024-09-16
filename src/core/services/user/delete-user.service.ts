import { IUpdateService } from '@core/domain/interfaces/service.interface';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@shared/exceptions';
import { UserFactory } from '@core/domain/factories/user.factory';
import { UserRepository } from '@core/infrastructure/repositories/user.repository';

@Injectable()
export class DeleteUserService
  implements IUpdateService<string, Promise<void>>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFactory: UserFactory,
  ) {}

  async update(userId: string): Promise<void> {
    const user = await this.userRepository.findOne(userId);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const updateUserDto = await this.userFactory.create({
      ...user,
      active: false,
    });

    await this.userRepository.update(updateUserDto, userId);
  }
}
