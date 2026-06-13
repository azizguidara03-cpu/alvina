import { Product } from '../types';
import { scrapedProducts } from './scrapedProducts';

export const products: Product[] = scrapedProducts.map((product, index) => {
  const safeSlug = product.slug && product.slug.trim().length > 0 ? product.slug : `alvina-item-${index + 1}`;
  return {
    ...product,
    slug: safeSlug,
    stock: typeof product.stock === "number" ? product.stock : ((index % 5) + 1),
  };
});
