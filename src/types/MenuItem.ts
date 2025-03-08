import MenuItemAddOn from "./MenuItemAddOn";

type MenuItem = {
  price: any;
  imageUrl: string | undefined;
  _id?: string;
  name: string;
  image: string;
  description: string;
  category: string;
  basePrice: string | number;
  sizes: MenuItemAddOn[];
  extraIngredientsPrices: MenuItemAddOn[];
}

export default MenuItem;