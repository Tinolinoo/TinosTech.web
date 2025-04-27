export interface Product {
  id: number;
  name: string;
  price: string;
  priceNumber: number;
  image: string;
  description: string;
  rating: number;
  specs: {
    [key: string]: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}