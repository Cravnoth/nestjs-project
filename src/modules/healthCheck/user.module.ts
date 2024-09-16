import { Module } from '@nestjs/common';
import { HealthCheckController } from '@app/controllers/healthCheck/healthCheck.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [HealthCheckController],
})
export class HealthCheckModule {}
