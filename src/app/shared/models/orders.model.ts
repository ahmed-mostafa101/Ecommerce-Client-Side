export interface OrderProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  quantity: number;
  thumbnail: string;
}

export interface CustomerData {
  address: {
    country: string;
    city: string;
    street: string;
    postCode: string;
  };
  name: string;
  phone: string;
}

export interface Order {
  _id: string;
  products: OrderProduct[];
  totalCost: number;
  savings: number;
  date: Date;
  status: string;
  customerData: CustomerData;
}

export interface OrdersList {
  orders: Order[];
  total: number;
}
