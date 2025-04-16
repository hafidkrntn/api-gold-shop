import { Router } from 'express';
import authRoutes from './auth/auth.routes';
import productRoutes from './product/product.routes';
import goldPurityRoutes from './gold-purity/goldPurity.routes';
import { authenticate } from '../middleware/auth.validation';


const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/product', authenticate, productRoutes);
routes.use('/gold-purity', authenticate, goldPurityRoutes)

export default routes;
