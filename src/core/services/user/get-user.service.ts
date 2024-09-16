import { IFindOneService } from '@core/domain/interfaces/service.interface';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@shared/exceptions';
import { User } from '@core/infrastructure/entities/user.entity';
import { UserRepository } from '@core/infrastructure/repositories/user.repository';

@Injectable()
export class GetUserService implements IFindOneService<string, Promise<User>> {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(userId: string): Promise<User> {
    const user = await this.userRepository.findOne(userId);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }
}
