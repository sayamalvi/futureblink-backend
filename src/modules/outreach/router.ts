import express from 'express';
import { asyncWrapper } from '../../common/utils/async-wrapper';
import { OutreachController } from './controller';
import logger from '../../config/logger';
import { EmailService } from '../../helpers/email/email';

const router = express.Router();

const emailService = new EmailService();
const outreachController = new OutreachController(logger, emailService);
router.post('/schedule', asyncWrapper(outreachController.send));

export default router;
