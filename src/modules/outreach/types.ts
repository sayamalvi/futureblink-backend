import { Request } from 'express';

export interface EmailRequestData {
    time: string;
    emailBody: string;
    subject: string;
    to: string;
}

export interface ScheduleEmailRequest extends Request {
    body: EmailRequestData;
}
