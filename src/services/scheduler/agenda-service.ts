import { Agenda, Job } from '@hokify/agenda';
import { Config } from '../../config';
import { EmailService } from '../../helpers/email/email';
import { EmailRequestData } from '../../modules/outreach/types';
import { Logger } from 'winston';

export class AgendaService {
    private agenda: Agenda;

    constructor(
        private readonly emailService: EmailService,
        private readonly logger: Logger,
    ) {
        this.agenda = new Agenda({
            db: { address: Config.MONGO_URI!, collection: 'agendaEmails' },
        });
        this.defineJobs();
    }

    private defineJobs() {
        this.agenda.define('send-email', async (job: Job) => {
            const { to, emailBody, time, subject } = job.attrs
                .data as EmailRequestData;
            try {
                await this.emailService.sendEmail(to, emailBody);
                this.logger.info(`✅ Email sent to ${to}`);
            } catch (err) {
                this.logger.error(`❌ Failed to send email to ${to}`, err);
            }
        });
    }

    public async scheduleEmail(emailData: EmailRequestData) {
        await this.agenda.schedule('1 minute', 'send-email', emailData);
    }

    public async start() {
        await this.agenda.start();
        await this.agenda.every('1 minute', 'send-email');
        this.logger.info('📆 Agenda started');
    }

    public async stop() {
        await this.agenda.stop();
        this.logger.info('🛑 Agenda stopped');
    }

    public getInstance() {
        return this.agenda;
    }
}
