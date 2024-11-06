import { Controller, Post, Body } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAlertDto } from './create-alert.dto';

@ApiTags('Alerts Management.')
@Controller('alerts')
export class AlertsController {
  constructor(private alertsService: AlertsService) {}

  @ApiOperation({ summary: 'Create an alert.' })
  @Post()
  async createAlert(@Body() body: CreateAlertDto) {
    const data = await this.alertsService.createAlert(
      body.chain,
      body.price,
      body.email,
    );
    return {
      data,
      message: 'Alert has been created.',
    };
  }
}
