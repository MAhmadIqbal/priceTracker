import { Controller, Get, Param } from '@nestjs/common';
import { PricesService } from './prices.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Prices Management.')
@Controller('prices')
export class PricesController {
  constructor(private pricesService: PricesService) {}

  @ApiOperation({ summary: 'Get hourly prices by chain.' })
  @Get(':chain')
  async getHourlyPrices(@Param('chain') chain: string) {
    return this.pricesService.getHourlyPrices(chain);
  }
}
