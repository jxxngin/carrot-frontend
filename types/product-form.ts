export type ProductFormValues = {
  title: string;
  price: string;
  location: string;
};

export type ProductFieldError = {
  field: string;
  message: string;
};

export type ProductFormState = {
  message: string;
  errors: ProductFieldError[];
  values: ProductFormValues;
};
