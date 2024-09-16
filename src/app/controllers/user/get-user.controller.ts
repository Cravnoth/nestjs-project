import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  InternalServerErrorException,
  UnprocessableEntityException,
  NotFoundException,
} from '@shared/exceptions';
import { IRequestHandler } from '@core/domain/interfaces/request-handler.interface';
import { GetUserService } from '@services/user/get-user.service';
import { UserResponse } from '@core/domain/dtos/user.dto';
import { GetUserResponse } from '@app/presenters/user.mapper';
import { ApiGetUsers } from '@app/swagger/swagger.decorators';

type handleResponse =
  | UserResponse
  | NotFoundException
  | UnprocessableEntityException
  | InternalServerErrorException;

@ApiTags('users')
@Controller('users')
export class GetUserController
  implements IRequestHandler<Promise<handleResponse>>
{
  constructor(private readonly userService: GetUserService) {}

  @ApiGetUsers()
  @Get(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
  })
  async handle(@Param() params: { id: string }): Promise<handleResponse> {
    try {
      const user = await this.userService.findOne(params.id);

      return GetUserResponse(user);
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
