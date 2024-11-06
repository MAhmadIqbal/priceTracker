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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAlertDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateAlertDto {
}
exports.CreateAlertDto = CreateAlertDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ethereum',
        description: 'The blockchain name (e.g., ethereum or polygon)',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['ethereum', 'polygon'], {
        message: 'Chain must be either ethereum or polygon',
    }),
    __metadata("design:type", String)
], CreateAlertDto.prototype, "chain", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1000, description: 'Target price for the alert' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0, { message: 'Price must be a positive number' }),
    __metadata("design:type", Number)
], CreateAlertDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'user@example.com',
        description: 'Email to notify when the target price is reached',
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'Email must be valid' }),
    __metadata("design:type", String)
], CreateAlertDto.prototype, "email", void 0);
//# sourceMappingURL=create-alert.dto.js.map