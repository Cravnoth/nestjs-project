import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '@core/infrastructure/entities/user.entity';
import { UserFactory } from '@core/domain/factories/user.factory';
import { UserRepository } from '@core/infrastructure/repositories/user.repository';
import { CreateUserController } from '@app/controllers/user/create-user.controller';
import { DeleteUserController } from '@app/controllers/user/delete-user.controller';
import { GetUserListController } from '@app/controllers/user/get-user-list.controller';
import { GetUserController } from '@app/controllers/user/get-user.controller';
import { CreateUserService } from '@services/user/create-user.service';
import { DeleteUserService } from '@services/user/delete-user.service';
import { GetUserListService } from '@services/user/get-user-list.service';
import { GetUserService } from '@services/user/get-user.service';
import { AuthMiddleware } from '@shared/middlewares/auth.middleware';
import { UpdateUserService } from '@services/user/update-user.service';
import { UpdateUserController } from '@app/controllers/user/update-user.controller';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [
    UserFactory,
    UserRepository,
    CreateUserService,
    GetUserService,
    GetUserListService,
    DeleteUserService,
    UpdateUserService,
  ],
  controllers: [
    CreateUserController,
    GetUserController,
    GetUserListController,
    DeleteUserController,
    UpdateUserController,
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.ALL });
  }
}
