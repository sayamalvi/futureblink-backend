import { Agenda, Job } from '@hokify/agenda';
import { Config } from '../../config';
import { EmailService } from '../../helpers/email/email';
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
            console.log('Email sent', Date.now());
            const { to, subject, body } = job.attrs.data as {
                to: string;
                subject: string;
                body: string;
            };

            // try {
            //     await this.emailService.sendEmail(to, body);
            //     console.log(`✅ Email sent to ${to}`);
            // } catch (err) {
            //     console.error(`❌ Failed to send email to ${to}`, err);
            // }
        });
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
