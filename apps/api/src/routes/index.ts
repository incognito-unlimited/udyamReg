import { Router } from 'express';
import healthRoutes from './healthRoutes';
import schemaRoutes from './schemaRoutes';
import registrationRoutes from './registrationRoutes';

const router = Router();

router.use('/health', healthRoutes);
router.use('/form-schema', schemaRoutes);
router.use('/registrations', registrationRoutes);

export default router;
