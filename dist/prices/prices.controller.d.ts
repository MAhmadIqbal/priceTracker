import { PricesService } from './prices.service';
export declare class PricesController {
    private pricesService;
    constructor(pricesService: PricesService);
    getHourlyPrices(chain: string): Promise<import("./price.entity").Price[]>;
}
