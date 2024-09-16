import { IFindAllService } from '@core/domain/interfaces/service.interface';
import { Injectable } from '@nestjs/common';
import { User } from '@core/infrastructure/entities/user.entity';
import { UserRepository } from '@core/infrastructure/repositories/user.repository';

@Injectable()
export class GetUserListService
  implements IFindAllService<number, Promise<User[]>>
{
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
