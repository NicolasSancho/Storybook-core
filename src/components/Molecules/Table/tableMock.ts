export interface MockedProduct {
  id: string;
  name: string;
  status: string;
  variants: number;
  price: string;
}

export const mockedTableProducts: MockedProduct[] = [
  { id: "1", name: "Trail Runner 2", status: "Active", variants: 6, price: "$129.00" },
  { id: "2", name: "City Loafer", status: "Draft", variants: 1, price: "$89.00" },
  { id: "3", name: "Harbor Boot", status: "Active", variants: 8, price: "$159.00" },
];
