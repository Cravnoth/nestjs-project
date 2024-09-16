import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '@core/infrastructure/entities/user.entity';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseConfig = configService.get('db');
        const apiConfig = configService.get('api');

        return {
          dialect: databaseConfig.dialect,
          host: databaseConfig.host,
          port: databaseConfig.port,
          username: databaseConfig.username,
          password: databaseConfig.password,
          database: databaseConfig.database,
          storage: databaseConfig?.storage,
          autoLoadModels: apiConfig.environment === 'test',
          synchronize: apiConfig.environment === 'test',
          logging: false,
          models: [User],
        };
      },
    }),
  ],
})
export class DatabaseModule {}
