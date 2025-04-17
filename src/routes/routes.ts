import { Router } from 'express';
import authRoutes from './auth/auth.routes';
import productRoutes from './product/product.routes';
import goldPurityRoutes from './gold-purity/goldPurity.routes';
import categoryRoutes from './category/category.routes'
import { authenticate } from '../middleware/auth.validation';


const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/product', authenticate, productRoutes);
routes.use('/gold-purity', authenticate, goldPurityRoutes)
routes.use('/category', authenticate, categoryRoutes)

export default routes;
