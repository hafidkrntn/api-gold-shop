import { Router } from 'express';
import authRoutes from './auth/auth.routes';
import productRoutes from './product/product.routes';
import { authenticate } from '../middleware/auth.validation';


const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/product', authenticate, productRoutes);

export default routes;
