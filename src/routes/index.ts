import { Router } from 'express';
import productRoutes from './products.routes';

const router: any = Router();

// Aplica el prefijo solicitado
router.use('/products', productRoutes);

export default router;