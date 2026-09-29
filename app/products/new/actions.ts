"use server";

import { JAVA_INT_MIN } from "@/lib/number-limits";
import { MAX_PRODUCT_PRICE, PRODUCT_PRICE_ERROR_MESSAGE } from "@/lib/product-constraints";
import type { Product } from "@/types/product";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { CreateProductState } from "./action-state";

export async function createProduct(
  _previousState: CreateProductState,
  formData: FormData,
): Promise<CreateProductState> {
  const values = {
    title: String(formData.get("title") ?? ""),
    price: String(formData.get("price") ?? ""),
    location: String(formData.get("location") ?? ""),
  };

  const apiBaseUrl = process.env.API_BASE_URL;

  if (!apiBaseUrl) {
    return {
      message: "서버 연결 설정을 확인해주세요",
      errors: [],
      values,
    };
  }

  const price = values.price.trim() === "" ? null : Number(values.price);

  if (
    price !== null &&
    (!Number.isInteger(price) || price > MAX_PRODUCT_PRICE || price < JAVA_INT_MIN)
  ) {
    return {
      message: "입력값을 확인해주세요.",
      errors: [
        {
          field: "price",
          message: PRODUCT_PRICE_ERROR_MESSAGE,
        },
      ],
      values,
    };
  }

  let product: Product;

  try {
    const response = await fetch(`${apiBaseUrl}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: values.title,
        price,
        location: values.location,
      }),
    });

    if (response.status === 400) {
      const errorBody: {
        message: string;
        errors: CreateProductState["errors"];
      } = await response.json();

      return {
        message: errorBody.message,
        errors: errorBody.errors,
        values,
      };
    }

    if (!response.ok) {
      return {
        message: "등록 요청을 처리하지 못했습니다. 잠시 후 다시 시도해주세요.",
        errors: [],
        values,
      };
    }

    product = await response.json();
  } catch {
    return {
      message: "등록 결과를 확인하지 못했습니다. 목록에서 등록 여부를 확인한 뒤 다시 시도해주세요.",
      errors: [],
      values,
    };
  }

  revalidatePath("/");
  redirect(`/products/${product.id}`);
}
