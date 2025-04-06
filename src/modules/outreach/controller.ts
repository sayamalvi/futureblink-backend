import { NextFunction, Request, Response } from 'express';
import { Logger } from 'winston';
import { EmailService } from '../../helpers/email/email';

export class OutreachController {
    constructor(
        private readonly logger: Logger,
        private readonly emailService: EmailService,
    ) {}
    send = async (req: Request, res: Response) => {
        await this.emailService.sendEmail('sayam.alvi18@gmail.com', 'Test');
        res.json({ msg: 'Sent' });
    };
}
