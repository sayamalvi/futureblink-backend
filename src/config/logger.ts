import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    defaultMeta: {
        server: 'futureblink',
    },
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'HH:mm:ss',
        }),
        winston.format.json(),
    ),
    transports: [
        new winston.transports.File({
            dirname: 'logs',
            filename: 'combined.log',
            level: 'info',
        }),
        new winston.transports.File({
            dirname: 'logs',
            filename: 'error.log',
            level: 'error',
        }),
        new winston.transports.Console({
            level: 'info',
            silent: process.env.NODE_ENV === 'production',
        }),
    ],
});

export default logger;
