import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@shared/exceptions';

export function ApiUsersOperations() {
  return applyDecorators(ApiBearerAuth('authorization'), ApiTags('users'));
}

export function ApiCreateUsers() {
  return applyDecorators(
    ApiOperation({
      summary: 'Criação de um usuário',
      description: 'Criação de um usuário',
    }),
    ApiBadRequestResponse({
      description: 'Caso o usuário não seja criado.',
      schema: {
        example: new BadRequestException('Error'),
      },
    }),
    ApiUnauthorizedResponse({
      description: 'Caso não haja um token válido.',
      schema: {
        example: new UnauthorizedException('Error'),
      },
    }),
    ApiBearerAuth('authorization'),
  );
}

export function ApiDeleteUsers() {
  return applyDecorators(
    ApiOperation({
      summary: 'Deleção de um usuário',
      description: 'Deleção de um usuário',
    }),
    ApiNotFoundResponse({
      description: 'Caso o usuário não seja encontrado.',
      schema: {
        example: new NotFoundException('Error'),
      },
    }),
    ApiUnauthorizedResponse({
      description: 'Caso não haja um token válido.',
      schema: {
        example: new UnauthorizedException('Error'),
      },
    }),
    ApiBearerAuth('authorization'),
  );
}

export function ApiGetUsersList() {
  return applyDecorators(
    ApiOperation({ summary: 'Retorno da listagem de usuários.' }),
    ApiBearerAuth('authorization'),
  );
}

export function ApiGetUsers() {
  return applyDecorators(
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'Identificador de usuário.',
    }),
    ApiOperation({ summary: 'Retorno de um usuário pelo identificador' }),
    ApiBearerAuth('authorization'),
  );
}

export function ApiUpdateUsers() {
  return applyDecorators(
    ApiOperation({ summary: 'Atualização parcial de um usuário.' }),
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'Identificador do usuário.',
    }),
    ApiBearerAuth('authorization'),
  );
}
