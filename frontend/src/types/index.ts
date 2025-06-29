export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isShopOwner: boolean;
  shopId?: string;
}

export interface Shop {
  id: string;
  name: string;
  owner: string;
  location: string;
  rating: number;
  verified: boolean;
  description: string;
  image: string;
}

export interface iPhone {
  id: string;
  model: string;
  storage: string;
  color: string;
  price: number;
  originalPrice?: number;
  condition: 'New' | 'Like New' | 'Good' | 'Fair';
  shopId: string;
  shopName: string;
  shopLocation: string;
  availability: number;
  images: string[];
  description: string;
  specifications: {
    display: string;
    processor: string;
    camera: string;
    battery: string;
  };
}

export interface CartItem {
  id: string;
  iphone: iPhone;
  quantity: number;
}