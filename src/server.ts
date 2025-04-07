import app from './app';
import logger from './config/logger';
import { initDB } from './config/db';
import { Config } from './config';
import { EmailService } from './services/email/email';
import { AgendaService } from './services/scheduler/agenda-service';

const startServer = async () => {
    const { NODE_ENV, PORT } = Config;

    try {
        await initDB();
        logger.info('✅ MongoDB Connected');

        const emailService = new EmailService();
        const agendaService = new AgendaService(emailService, logger);

        app.listen(PORT, async () => {
            logger.info(
                `🚀 Server running on port ${PORT} in ${NODE_ENV} mode`,
            );
            await agendaService.start();
        });

        const handleShutdown = async () => {
            await agendaService.stop();
            process.exit(0);
        };

        process.on('SIGINT', handleShutdown);
        process.on('SIGTERM', handleShutdown);
    } catch (err) {
        if (err instanceof Error) {
            logger.error(err.message);
            logger.on('finish', () => process.exit(1));
        }
    }
};

void startServer();
