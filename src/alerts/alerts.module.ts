import { Module } from '@nestjs/common';
import { AlertsController } from './alerts.controller';
import { AlertsService } from './alerts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alert } from './alert.entity';
import { Price } from 'src/prices/price.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Alert, Price])],
  controllers: [AlertsController],
  providers: [AlertsService],
  exports: [AlertsService],
})
export class AlertsModule {}
