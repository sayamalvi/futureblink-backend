import mongoose from 'mongoose';
import config from 'config';
import { Config } from '.';

export const initDB = async () => {
    await mongoose.connect(Config.MONGO_URI!);
};
