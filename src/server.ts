import app from './app';
import logger from './config/logger';
import { initDB } from './config/db';
import { Config } from './config';

const startServer = async () => {
    const { NODE_ENV, PORT } = Config;
    try {
        await initDB();
        logger.info('MongoDB Connected');
        app.listen(PORT, () =>
            logger.info(`Listening on port ${PORT} in ${NODE_ENV} mode`),
        );
    } catch (err: unknown) {
        if (err instanceof Error) {
            logger.error(err.message);
            logger.on('finish', () => {
                process.exit(1);
            });
        }
    }
};

void startServer();
