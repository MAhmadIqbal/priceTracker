import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Price } from './price.entity';
export declare class PricesService implements OnModuleInit {
    private priceRepository;
    constructor(priceRepository: Repository<Price>);
    onModuleInit(): Promise<void>;
    fetchAndSavePrice(chain: 'ethereum' | 'polygon'): Promise<void>;
    fetchPricesCron(): Promise<void>;
    getHourlyPrices(chain: string): Promise<Price[]>;
}
