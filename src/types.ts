export interface ProductColor {
  name: string;
  hex: string;
  tailwindBg: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'feminino' | 'masculino' | 'unissex' | 'alfaiataria' | 'linho';
  subcategory: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isSustainable?: boolean;
  description: string;
  details: string[];
  composition: string;
  sizes: ('PP' | 'P' | 'M' | 'G' | 'GG')[];
  colors: ProductColor[];
  primaryImage: string;
  secondaryImage: string;
  detailImage?: string;
  tag?: string;
}

export interface CartItem {
  id: string; // unique item id (productId + size + color)
  product: Product;
  selectedSize: 'PP' | 'P' | 'M' | 'G' | 'GG';
  selectedColor: ProductColor;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number;
  comment: string;
  purchasedItem: string;
  date: string;
  avatar: string;
}

export interface LookbookItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  season: string;
  productIds: string[];
}
