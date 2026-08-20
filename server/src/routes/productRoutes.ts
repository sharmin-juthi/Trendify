import { Router } from 'express';
import { getProducts, getProductBySlug, createProduct } from '../controllers/productController';

const router = Router();

router.get('/', getProducts);
router.get('/:slug', getProductBySlug);
router.post('/', createProduct);

export default router;
