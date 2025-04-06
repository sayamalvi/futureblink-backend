import { Request } from 'express';

export interface ScheduleEmailRequest extends Request {
    time: string;
    emailBody: string;
    subject: string;
    to: string;
}
