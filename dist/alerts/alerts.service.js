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
exports.AlertsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nodemailer = require("nodemailer");
const price_entity_1 = require("../prices/price.entity");
const alert_entity_1 = require("./alert.entity");
const schedule_1 = require("@nestjs/schedule");
let AlertsService = class AlertsService {
    constructor(alertRepository, priceRepository) {
        this.alertRepository = alertRepository;
        this.priceRepository = priceRepository;
    }
    async createAlert(chain, targetPrice, email) {
        const alert = this.alertRepository.create({ chain, targetPrice, email });
        return this.alertRepository.save(alert);
    }
    async checkPriceAlerts() {
        const alerts = await this.alertRepository.find({
            where: { isTriggered: false },
        });
        for (const alert of alerts) {
            const latestPrice = await this.priceRepository.findOne({
                where: { chain: alert.chain },
                order: { timestamp: 'DESC' },
            });
            if (latestPrice && latestPrice.price >= alert.targetPrice) {
                await this.sendEmail(alert.email, alert.chain, alert.targetPrice);
                alert.isTriggered = true;
                await this.alertRepository.save(alert);
            }
        }
    }
    async sendEmail(to, chain, price) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD },
        });
        await transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject: `Price Alert for ${chain}`,
            text: `The price of ${chain} has reached ${price}.`,
        });
    }
};
exports.AlertsService = AlertsService;
__decorate([
    (0, schedule_1.Cron)('0 * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlertsService.prototype, "checkPriceAlerts", null);
exports.AlertsService = AlertsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(alert_entity_1.Alert)),
    __param(1, (0, typeorm_1.InjectRepository)(price_entity_1.Price)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AlertsService);
//# sourceMappingURL=alerts.service.js.map