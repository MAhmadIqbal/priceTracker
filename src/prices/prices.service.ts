import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Price } from './price.entity';
import Moralis from 'moralis';

@Injectable()
export class PricesService implements OnModuleInit {
  constructor(
    @InjectRepository(Price)
    private priceRepository: Repository<Price>,
  ) {}

  async onModuleInit() {
    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
  }

  async fetchAndSavePrice(chain: 'ethereum' | 'polygon') {
    const address =
      chain === 'ethereum'
        ? '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
        : '0x0000000000000000000000000000000000001010';

    const response = await Moralis.EvmApi.token.getTokenPrice({
      address,
      chain: chain === 'ethereum' ? 'eth' : 'polygon',
    });

    const price = response.result.usdPrice;
    await this.priceRepository.save({ chain, price });
  }

  @Cron('*/5 * * * *')
  async fetchPricesCron() {
    await this.fetchAndSavePrice('ethereum');
    await this.fetchAndSavePrice('polygon');
  }

  async getHourlyPrices(chain: string) {
    const date = new Date();
    date.setHours(date.getHours() - 24);
    return this.priceRepository.find({
      where: { chain, timestamp: MoreThan(date) },
      order: { timestamp: 'DESC' },
    });
  }
}
