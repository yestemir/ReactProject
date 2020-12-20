import { Product } from "./Product";

export interface Order {
  products: Product[];
  grantTotal: number;
  delivery: number;
  tax: number;
  orderDate: Date;
}
