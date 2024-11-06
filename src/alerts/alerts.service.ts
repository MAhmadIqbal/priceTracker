import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { Price } from '../prices/price.entity';
import { Alert } from './alert.entity';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private alertRepository: Repository<Alert>,
    @InjectRepository(Price)
    private priceRepository: Repository<Price>,
  ) {}

  async createAlert(chain: string, targetPrice: number, email: string) {
    const alert = this.alertRepository.create({ chain, targetPrice, email });
    return this.alertRepository.save(alert);
  }

  @Cron('0 * * * *')
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

  async sendEmail(to: string, chain: string, price: number) {
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
}
