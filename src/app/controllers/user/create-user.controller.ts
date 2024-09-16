import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InternalServerErrorException } from '@shared/exceptions/internal-server-error.exception';
import { IRequestHandler } from '@core/domain/interfaces/request-handler.interface';
import { BadRequestException, NotFoundException } from '@shared/exceptions';
import { UnprocessableEntityException } from '@shared/exceptions';
import { CreateUserService } from '@services/user/create-user.service';
import { UserBodyDto, UserResponse } from '@core/domain/dtos/user.dto';
import { GetUserResponse } from '@app/presenters/user.mapper';
import { ApiCreateUsers } from '@app/swagger/swagger.decorators';

type handleResponse =
  | UserResponse
  | NotFoundException
  | UnprocessableEntityException
  | InternalServerErrorException;

@ApiTags('users')
@Controller('users')
export class CreateUserController
  implements IRequestHandler<Promise<handleResponse>>
{
  constructor(private readonly userService: CreateUserService) {}

  @ApiCreateUsers()
  @Post()
  @HttpCode(201)
  async handle(
    @Body(ValidationPipe) userBodyDto: UserBodyDto,
  ): Promise<handleResponse> {
    try {
      const newUser = await this.userService.create(userBodyDto);

      return GetUserResponse(newUser);
    } catch (error) {
      switch (error.status) {
        case HttpStatus.NOT_FOUND:
          throw new NotFoundException(error.message);
        case HttpStatus.BAD_REQUEST:
          throw new BadRequestException(error.message);
        case HttpStatus.UNPROCESSABLE_ENTITY:
          throw new UnprocessableEntityException(error.message);
        default:
          throw new InternalServerErrorException(error.message);
      }
    }
  }
}
