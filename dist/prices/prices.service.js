"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricesService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const price_entity_1 = require("./price.entity");
const moralis_1 = require("moralis");
let PricesService = class PricesService {
    constructor(priceRepository) {
        this.priceRepository = priceRepository;
    }
    async onModuleInit() {
        await moralis_1.default.start({ apiKey: process.env.MORALIS_API_KEY });
    }
    async fetchAndSavePrice(chain) {
        const address = chain === 'ethereum'
            ? '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
            : '0x0000000000000000000000000000000000001010';
        const response = await moralis_1.default.EvmApi.token.getTokenPrice({
            address,
            chain: chain === 'ethereum' ? 'eth' : 'polygon',
        });
        const price = response.result.usdPrice;
        await this.priceRepository.save({ chain, price });
    }
    async fetchPricesCron() {
        await this.fetchAndSavePrice('ethereum');
        await this.fetchAndSavePrice('polygon');
    }
    async getHourlyPrices(chain) {
        const date = new Date();
        date.setHours(date.getHours() - 24);
        return this.priceRepository.find({
            where: { chain, timestamp: (0, typeorm_2.MoreThan)(date) },
            order: { timestamp: 'DESC' },
        });
    }
};
exports.PricesService = PricesService;
__decorate([
    (0, schedule_1.Cron)('*/5 * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PricesService.prototype, "fetchPricesCron", null);
exports.PricesService = PricesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(price_entity_1.Price)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PricesService);
//# sourceMappingURL=prices.service.js.map