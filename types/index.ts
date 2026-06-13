export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  description: string;
  composition: string;
  isNew: boolean;
  isBestseller: boolean;
  rating: number;
  reviews: number;
  stock?: number;
}

export interface CartItem {
  id: string; // virtual ID for cart item
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
}
