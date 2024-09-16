import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@shared/exceptions';
import { IRequestHandler } from '@core/domain/interfaces/request-handler.interface';
import { GetUserListService } from '@services/user/get-user-list.service';
import { GetUsersResponse } from '@app/presenters/user.mapper';
import { UserResponse } from '@core/domain/dtos/user.dto';
import { ApiGetUsersList } from '@app/swagger/swagger.decorators';

type handleResponse =
  | UserResponse[]
  | NotFoundException
  | UnprocessableEntityException
  | InternalServerErrorException;

@ApiTags('users')
@Controller('users')
export class GetUserListController
  implements IRequestHandler<Promise<handleResponse>>
{
  constructor(private readonly userService: GetUserListService) {}

  @ApiGetUsersList()
  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Listagem de usuários.',
  })
  async handle(): Promise<handleResponse> {
    try {
      const users = await this.userService.findAll();

      return GetUsersResponse(users);
    } catch (error) {
      switch (error.status) {
        case HttpStatus.NOT_FOUND:
          throw new NotFoundException(error.message);
        case HttpStatus.UNPROCESSABLE_ENTITY:
          throw new UnprocessableEntityException(error.message);
        default:
          throw new InternalServerErrorException(error.message);
      }
    }
  }
}
