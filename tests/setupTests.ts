import 'reflect-metadata';
import { Injectable } from '@nestjs/common';
import { CreateUserService } from '@services/user/create-user.service';
import { User } from '@core/infrastructure/entities/user.entity';
import { UserBodyDto } from '@core/domain/dtos/user.dto';

@Injectable()
export class TestSetupService {
  constructor(private readonly createUserService: CreateUserService) {}

  async setupUser(data: UserBodyDto): Promise<User> {
    return await this.createUserService.create(data);
  }
}
