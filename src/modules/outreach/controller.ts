import { NextFunction, Request, Response } from 'express';
import { Logger } from 'winston';
import { EmailService } from '../../helpers/email/email';
import type { ScheduleEmailRequest, EmailRequestData } from './types';
import { AgendaService } from '../../services/scheduler/agenda-service';

export class OutreachController {
    constructor(
        private readonly agendaService: AgendaService,
        private readonly logger: Logger,
    ) {}

    scheduleEmail = async (req: ScheduleEmailRequest, res: Response) => {
        const emailRequests = req.body;

        try {
            const schedulePromises = emailRequests.map((emailData) =>
                this.agendaService.scheduleEmail(emailData),
            );

            await Promise.all(schedulePromises);
            this.logger.info(
                `Successfully scheduled ${emailRequests.length} emails`,
            );
            res.json({
                msg: `Successfully scheduled ${emailRequests.length} emails`,
            });
        } catch (error) {
            this.logger.error('Failed to schedule emails');
            res.status(500).json({ error: 'Failed to schedule emails' });
        }
    };
}
