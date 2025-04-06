import { config } from 'dotenv';
import path from 'path';

config({
    path: path.join(__dirname, `../../.env.${process.env.NODE_ENV ?? 'dev'}`),
});

const { PORT, NODE_ENV, MONGO_URI, EMAIL, EMAIL_APP_PASS } = process.env;

export const Config = {
    PORT,
    NODE_ENV,
    MONGO_URI,
    EMAIL,
    EMAIL_APP_PASS,
};
