import { Optional } from 'sequelize';
import {
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
  DataType,
  Default,
} from 'sequelize-typescript';
import { UserDto } from '@core/domain/dtos/user.dto';
import { GenderEnum } from '@core/domain/enums/user.enum';

interface UserDtoOptionalAttributes extends Optional<UserDto, 'id'> {}

@Table({
  tableName: 'users',
  timestamps: true,
  underscored: true,
  indexes: [
    {
      name: 'unique_uuid',
      unique: true,
      fields: ['uuid'],
    },
  ],
})
export class User extends Model<UserDto, UserDtoOptionalAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @Column
  public uuid: string;

  @Column
  public name: string;

  @Column
  public alias?: string;

  @Column
  public document: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  public birthDate: Date;

  @Column({
    type: DataType.ENUM(...Object.values(GenderEnum)),
    allowNull: false,
  })
  public gender: GenderEnum;

  @Column
  public active: boolean;

  @Default(DataType.NOW)
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  public createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  public updatedAt?: Date;
}
