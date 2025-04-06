import { NextFunction, Request, Response } from 'express';
import { Logger } from 'winston';
import { EmailService } from '../../helpers/email/email';
import { ScheduleEmailRequest } from './types';

export class OutreachController {
    constructor(
        private readonly logger: Logger,
        private readonly emailService: EmailService,
    ) {}
    send = async (req: ScheduleEmailRequest, res: Response) => {
        await this.emailService.sendEmail(req.to, req.emailBody);
        res.json({ msg: 'Sent' });
    };
}
