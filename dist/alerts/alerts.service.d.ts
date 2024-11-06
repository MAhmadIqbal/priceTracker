import { Repository } from 'typeorm';
import { Price } from '../prices/price.entity';
import { Alert } from './alert.entity';
export declare class AlertsService {
    private alertRepository;
    private priceRepository;
    constructor(alertRepository: Repository<Alert>, priceRepository: Repository<Price>);
    createAlert(chain: string, targetPrice: number, email: string): Promise<Alert>;
    checkPriceAlerts(): Promise<void>;
    sendEmail(to: string, chain: string, price: number): Promise<void>;
}
