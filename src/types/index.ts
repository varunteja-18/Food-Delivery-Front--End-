export interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
}

export interface CartItem extends FoodItem {
  quantity: number;
}
