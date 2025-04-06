import nodemailer from 'nodemailer';
import logger from '../../config/logger';
import { Config } from '../../config';

export class EmailService {
    sendEmail = async (to: string, subject: string) => {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: false,
            auth: {
                user: Config.EMAIL,
                pass: Config.EMAIL_APP_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        transporter.verify((error, _) => {
            if (error) {
                logger.error(error);
            } else {
                logger.info('Server is ready to take messages');
            }
        });
        const info = await transporter.sendMail({
            from: Config.EMAIL,
            to,
            subject,
            html: 'Test',
        });
        logger.info('Email sent', info.messageId);
    };
}
