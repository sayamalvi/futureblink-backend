import { Request } from 'express';

export interface EmailRequestData {
    time: number;
    emailBody: string;
    subject: string;
    to: string;
}

export interface ScheduleEmailRequest extends Request {
    body: EmailRequestData[];
}
