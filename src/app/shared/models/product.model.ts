export interface ProductsApiResponse {
  products: Product[],
  total: number,
  limit: number,
  skip: number,
  filtered: boolean
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  salesCount: number;
  warrantyInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export function createDefaultProduct(): Product {
  return {
    _id: '',
    title: '',
    description: '',
    category: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: '',
    salesCount: 0,
    warrantyInformation: '',
    availabilityStatus: '',
    reviews: [],
    returnPolicy: '',
    meta: {
      createdAt: '',
      updatedAt: '',
      barcode: '',
      qrCode: ''
    },
    images: [],
    thumbnail: ''
  };
}
