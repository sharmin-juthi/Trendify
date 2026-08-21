import { Request, Response } from 'express';
import { Product } from '../models/Product';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search, sort, flashSaleOnly, bestDealsOnly } = req.query;

    const query: any = {};

    if (category && category !== 'all') {
      const cat = String(category).toLowerCase();
      query.$or = [
        { categorySlug: cat },
        { category: new RegExp(`^${cat}$`, 'i') }
      ];
    }

    if (search && String(search).trim() !== '') {
      const q = String(search).trim();
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { brand: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }

    if (flashSaleOnly === 'true') {
      query.isFlashSale = true;
    }

    if (bestDealsOnly === 'true') {
      query.discountPercent = { $gte: 20 };
    }

    let sortOptions: any = { createdAt: -1 };
    if (sort) {
      switch (sort) {
        case 'price-low':
          sortOptions = { price: 1 };
          break;
        case 'price-high':
          sortOptions = { price: -1 };
          break;
        case 'rating':
          sortOptions = { rating: -1 };
          break;
        case 'newest':
          sortOptions = { createdAt: -1 };
          break;
        case 'popular':
        default:
          sortOptions = { reviewCount: -1 };
          break;
      }
    }

    const products = await Product.find(query).sort(sortOptions);
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

export const getProductBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const slugParam = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
    const isObjectId = typeof slugParam === 'string' && /^[0-9a-fA-F]{24}$/.test(slugParam);
    const product = await Product.findOne({
      $or: [{ slug: slugParam }, { _id: isObjectId ? slugParam : null }]
    });

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json(product);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (error: any) {
    res.status(400).json({ message: 'Failed to create product', error: error.message });
  }
};
