import { Module } from '@nestjs/common';
import { TestSetupService } from '../../../tests/setupTests';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '@core/infrastructure/entities/user.entity';
import { CreateUserService } from '@services/user/create-user.service';
import { GetUserService } from '@services/user/get-user.service';
import { GetUserListService } from '@services/user/get-user-list.service';
import { DeleteUserService } from '@services/user/delete-user.service';
import { UpdateUserService } from '@services/user/update-user.service';
import { UserRepository } from '@core/infrastructure/repositories/user.repository';
import { UserFactory } from '@core/domain/factories/user.factory';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [
    TestSetupService,

    CreateUserService,
    GetUserService,
    GetUserListService,
    DeleteUserService,
    UpdateUserService,
    UserRepository,
    UserFactory,
  ],
})
export class TestModule {}
