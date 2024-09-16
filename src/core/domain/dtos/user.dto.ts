import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';
import { GenderEnum } from '../enums/user.enum';

export class UserBodyDto {
  @IsString()
  @ApiProperty({
    example: 'James Bond',
    description: 'Name of the user',
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '007',
    description: 'Alias or nickname of the user',
  })
  alias: string;

  @IsString()
  @ApiProperty({
    example: '74319581024',
    description: 'Document number of the user',
  })
  document: string;

  @IsDateString()
  @ApiProperty({
    example: '1990-01-01',
    description: 'Date of birth of the user in ISO 8601 format (YYYY-MM-DD)',
  })
  birthDate: string;

  @IsEnum(GenderEnum)
  @ApiProperty({
    example: GenderEnum.MALE,
    description: 'Gender of the user',
  })
  gender: GenderEnum;
}

export class UserResponse {
  id: string;
  name: string;
  alias?: string;
  document: string;
  birthDate: Date;
  gender: GenderEnum;
  createdAt: Date;
  updatedAt?: Date;
}

export class UserDto {
  id?: number;
  uuid: string;
  name: string;
  alias?: string;
  document: string;
  birthDate: Date;
  gender: GenderEnum;
  active: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
