export type Product = {
  id: number;
  title: string;
  price: number;
  location: string;
};

export type ProductPageResponse = {
  content: Product[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
};
