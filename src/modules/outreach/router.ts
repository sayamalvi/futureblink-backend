import express from 'express';
import { asyncWrapper } from '../../common/utils/async-wrapper';
import { OutreachController } from './controller';
import logger from '../../config/logger';
import { EmailService } from '../../helpers/email/email';
import { AgendaService } from '../../services/scheduler/agenda-service';

const router = express.Router();

// Dependencies
const emailService = new EmailService();
const agendaService = new AgendaService(emailService, logger);

const outreachController = new OutreachController(agendaService, logger);

router.post('/schedule', asyncWrapper(outreachController.scheduleEmail));

export default router;
