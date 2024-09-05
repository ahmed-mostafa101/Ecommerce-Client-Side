export interface Cart {
  products: CartProduct[];
  originalCost: number;
  shippingCost: number;
  savings: number;
  totalProducts: number;
  totalQuantity: number;
  totalCost: number;
}

export interface CartProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  quantity: number;
  thumbnail: string;
}

export function getDefaultCart(): Cart {
  return {
    products: [],
    originalCost: 0,
    shippingCost: 0,
    savings: 0,
    totalProducts: 0,
    totalQuantity: 0,
    totalCost: 0
  };
}
