export type CreateProductState = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
  values: {
    title: string;
    price: string;
    location: string;
  };
};
