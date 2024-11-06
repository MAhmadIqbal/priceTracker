import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './create-alert.dto';
export declare class AlertsController {
    private alertsService;
    constructor(alertsService: AlertsService);
    createAlert(body: CreateAlertDto): Promise<{
        data: import("./alert.entity").Alert;
        message: string;
    }>;
}
