import {
  Controller,
  Delete,
  HttpStatus,
  HttpCode,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IRequestHandler } from '@core/domain/interfaces/request-handler.interface';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@shared/exceptions';
import { DeleteUserService } from '@services/user/delete-user.service';
import { ApiDeleteUsers } from '@app/swagger/swagger.decorators';

@ApiTags('users')
@Controller('users/:id')
export class DeleteUserController implements IRequestHandler<Promise<void>> {
  constructor(private readonly userService: DeleteUserService) {}

  @ApiDeleteUsers()
  @Delete()
  @HttpCode(204)
  async handle(@Param() params: { id: string }): Promise<void> {
    try {
      await this.userService.update(params.id);
    } catch (error) {
      switch (error.status) {
        case HttpStatus.NOT_FOUND:
          throw new NotFoundException(error.message);
        default:
          throw new InternalServerErrorException(error.message);
      }
    }
  }
}
