import {
  Controller,
  HttpStatus,
  HttpCode,
  Param,
  ValidationPipe,
  Body,
  Patch,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { IRequestHandler } from '@core/domain/interfaces/request-handler.interface';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@shared/exceptions';
import { UpdateUserService } from '@services/user/update-user.service';
import { UserBodyDto } from '@core/domain/dtos/user.dto';
import { ApiUpdateUsers } from '@app/swagger/swagger.decorators';

type handleResponse =
  | void
  | NotFoundException
  | UnprocessableEntityException
  | InternalServerErrorException;

@ApiTags('users')
@Controller('users/:id')
export class UpdateUserController
  implements IRequestHandler<Promise<handleResponse>>
{
  constructor(private readonly userService: UpdateUserService) {}

  @ApiUpdateUsers()
  @Patch()
  @HttpCode(204)
  @ApiResponse({
    status: 204,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não localizado pelo identificador.',
  })
  async handle(
    @Body(ValidationPipe) userBodyDto: Partial<UserBodyDto>,
    @Param() params: { id: string },
  ): Promise<void> {
    try {
      await this.userService.update(params.id, userBodyDto);
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
