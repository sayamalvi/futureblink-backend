import { Agenda, Job } from '@hokify/agenda';
import { Config } from '../../config';
import { EmailService } from '../../helpers/email/email';
import { EmailRequestData } from '../../modules/outreach/types';

export class AgendaService {
    private agenda: Agenda;

    constructor(private readonly emailService: EmailService) {
        this.agenda = new Agenda({
            db: { address: Config.MONGO_URI!, collection: 'agendaEmails' },
        });
        this.defineJobs();
    }

    private defineJobs() {
        this.agenda.define('send-email', async (job: Job) => {
            const { to, emailBody, time, subject } = job.attrs.data as EmailRequestData;

            console.log(to, emailBody, time, subject);
            try {
                await this.emailService.sendEmail(to, emailBody);
                console.log(`✅ Email sent to ${to}`);
            } catch (err) {
                console.error(`❌ Failed to send email to ${to}`, err);
            }
        });
    }

    public async scheduleEmail(emailData: EmailRequestData) {
        await this.agenda.schedule('5 seconds', 'send-email', emailData);
    }

    public async start() {
        await this.agenda.start();
        await this.agenda.every('5 seconds', 'send-email');
        console.log('📆 Agenda started');
    }

    public async stop() {
        await this.agenda.stop();
        console.log('🛑 Agenda stopped');
    }

    public getInstance() {
        return this.agenda;
    }
}
