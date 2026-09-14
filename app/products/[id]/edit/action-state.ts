export type UpdateProductState = {
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
