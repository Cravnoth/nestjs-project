import { IUpdateService } from '@core/domain/interfaces/service.interface';
import { Injectable } from '@nestjs/common';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@shared/exceptions';
import { UserFactory } from '@core/domain/factories/user.factory';
import { UserRepository } from '@core/infrastructure/repositories/user.repository';
import { UserBodyDto, UserDto } from '@core/domain/dtos/user.dto';

@Injectable()
export class UpdateUserService
  implements IUpdateService<Partial<UserBodyDto>, Promise<void>>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFactory: UserFactory,
  ) {}

  async update(userId: string, patchUser: Partial<UserBodyDto>): Promise<void> {
    const user = await this.userRepository.findOne(userId);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const { alias, birthDate, document, gender, name } = patchUser;

    if (document) {
      await this.validateDocument(document);
    }

    const updateData: UserDto = {
      ...user,
      alias,
    };

    name ? (updateData.name = name) : null;
    document ? (updateData.document = document) : null;
    birthDate ? (updateData.birthDate = new Date(birthDate)) : null;
    gender ? (updateData.gender = gender) : null;

    const updateUserDto = await this.userFactory.create(updateData);

    await this.userRepository.update(updateUserDto, userId);
  }

  private async validateDocument(document: string): Promise<void> {
    const user = await this.userRepository.findOneByDocument(document);

    if (user && user.active) {
      throw new UnprocessableEntityException(
        'Documentation already registered!',
      );
    }
  }
}
