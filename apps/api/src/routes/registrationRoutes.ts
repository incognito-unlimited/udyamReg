import { Router } from 'express';
import { registrationController } from '../controllers/registrationController';

const router = Router();

router.post('/', registrationController.initiate);
router.get('/:id', registrationController.getRegistration);

export default router;
