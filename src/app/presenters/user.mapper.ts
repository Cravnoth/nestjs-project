import { UserResponse } from '@core/domain/dtos/user.dto';
import { User } from '@core/infrastructure/entities/user.entity';

export const GetUserResponse = (user: User): UserResponse => {
  return {
    id: user.uuid,
    name: user.name,
    alias: user.alias,
    document: user.document,
    birthDate: user.birthDate,
    gender: user.gender,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const GetUsersResponse = (userList: User[]): UserResponse[] => {
  return userList.map((user) => GetUserResponse(user));
};
