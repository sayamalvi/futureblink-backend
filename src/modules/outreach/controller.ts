import { NextFunction, Request, Response } from 'express';
import { Logger } from 'winston';
import { EmailService } from '../../helpers/email/email';
import type { ScheduleEmailRequest, EmailRequestData } from './types';
import { AgendaService } from '../../services/scheduler/agenda-service';

export class OutreachController {
    constructor(private readonly agendaService: AgendaService) {}

    scheduleEmail = async (req: ScheduleEmailRequest, res: Response) => {
        const { time, emailBody, subject, to } = req.body;
        await this.agendaService.scheduleEmail({ time, emailBody, subject, to });
        res.json({ msg: 'Email scheduled successfully' });
    };
}
