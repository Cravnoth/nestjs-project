import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IUserRepository } from '@core/domain/interfaces/user.interface';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create({ dataValues }: User): Promise<User> {
    return await this.userModel.create(dataValues);
  }

  async findOne(userId: string): Promise<User | null> {
    return await this.userModel.findOne({
      where: { uuid: userId, active: true },
    });
  }

  async findOneByDocument(document: string): Promise<User | null> {
    return await this.userModel.findOne({
      where: { document },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll({
      where: { active: true },
      order: [['id', 'ASC']],
    });
  }

  async update({ dataValues }: User, userId: string): Promise<void> {
    const { name, alias, document, birthDate, gender, active } = dataValues;

    const updatePayload: Partial<User> = {};

    name ? (updatePayload.name = name) : null;
    alias ? (updatePayload.alias = alias) : null;
    document ? (updatePayload.document = document) : null;
    birthDate ? (updatePayload.birthDate = birthDate) : null;
    gender ? (updatePayload.gender = gender) : null;
    typeof active != undefined ? (updatePayload.active = active) : null;

    await this.userModel.update(updatePayload, { where: { uuid: userId } });
  }
}
