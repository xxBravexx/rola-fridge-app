import { FridgeItem } from './fridgeItem';

export interface Fridge {
  id: string;
  inventory: FridgeItem[];
}
