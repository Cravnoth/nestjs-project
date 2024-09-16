import { ICreateService } from '@core/domain/interfaces/service.interface';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { BadRequestException } from '@shared/exceptions';
import { UserBodyDto } from '@core/domain/dtos/user.dto';
import { User } from '@core/infrastructure/entities/user.entity';
import { UserRepository } from '@core/infrastructure/repositories/user.repository';
import { UserFactory } from '@core/domain/factories/user.factory';
import { GenderEnum } from '@core/domain/enums/user.enum';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateUserService
  implements ICreateService<UserBodyDto, Promise<User>>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFactory: UserFactory,
  ) {}

  async create(user: UserBodyDto): Promise<User> {
    const { name, alias, document, birthDate } = user;
    const gender = GenderEnum[user.gender];

    const getUserByDocument = await this.validateDocument(document);

    if (getUserByDocument) {
      const updateUserDto = await this.userFactory.create({
        ...getUserByDocument,
        active: true,
      });

      await this.userRepository.update(updateUserDto, getUserByDocument.uuid);

      return getUserByDocument;
    }

    if (!gender) throw new BadRequestException('Invalid gender!');

    const userDto = await this.userFactory.create({
      uuid: uuidv4(),
      name,
      alias,
      document,
      birthDate: new Date(birthDate),
      gender,
      active: true,
      createdAt: new Date(),
    });

    return await this.userRepository.create(userDto);
  }

  private async validateDocument(document: string): Promise<User | null> {
    const user = await this.userRepository.findOneByDocument(document);

    if (user && user.active) {
      throw new UnprocessableEntityException(
        'Documentation already registered!',
      );
    }

    return user;
  }
}
