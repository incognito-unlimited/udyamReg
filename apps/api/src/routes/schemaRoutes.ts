import { Router } from 'express';
import { schemaController } from '../controllers/schemaController';

const router = Router();

// Handle async controller method safely
router.get('/', (req, res, next) => {
  schemaController.getFormSchema(req, res).catch(next);
});

export default router;
