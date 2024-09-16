import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthCheckController {
  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Verificação de saúde da aplicação.' })
  @ApiResponse({
    status: 200,
    description: 'Aplicação está saudável.',
  })
  checkHealth() {
    return { status: 'OK', timestamp: new Date().toISOString() };
  }
}
