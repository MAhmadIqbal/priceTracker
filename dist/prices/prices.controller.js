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
exports.PricesController = void 0;
const common_1 = require("@nestjs/common");
const prices_service_1 = require("./prices.service");
const swagger_1 = require("@nestjs/swagger");
let PricesController = class PricesController {
    constructor(pricesService) {
        this.pricesService = pricesService;
    }
    async getHourlyPrices(chain) {
        return this.pricesService.getHourlyPrices(chain);
    }
};
exports.PricesController = PricesController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get hourly prices by chain.' }),
    (0, common_1.Get)(':chain'),
    __param(0, (0, common_1.Param)('chain')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PricesController.prototype, "getHourlyPrices", null);
exports.PricesController = PricesController = __decorate([
    (0, swagger_1.ApiTags)('Prices Management.'),
    (0, common_1.Controller)('prices'),
    __metadata("design:paramtypes", [prices_service_1.PricesService])
], PricesController);
//# sourceMappingURL=prices.controller.js.map