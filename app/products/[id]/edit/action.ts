"use server";

import { withProductKeyword } from "@/lib/product-search";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { UpdateProductState } from "./action-state";

export async function updateProduct(
  productId: number,
  keyword: string,
  _previousState: UpdateProductState,
  formData: FormData,
): Promise<UpdateProductState> {
  const values = {
    title: String(formData.get("title") ?? ""),
    price: String(formData.get("price") ?? ""),
    location: String(formData.get("location") ?? ""),
  };

  if (!Number.isSafeInteger(productId) || productId <= 0) {
    return {
      message: "유효하지 않은 상품 ID 입니다.",
      errors: [],
      values,
    };
  }

  const apiBaseUrl = process.env.API_BASE_URL;

  if (!apiBaseUrl) {
    return {
      message: "서버 연결 설정을 확인해주세요.",
      errors: [],
      values,
    };
  }

  const price = values.price.trim() === "" ? null : Number(values.price);

  if (price !== null && (!Number.isInteger(price) || price > 2147483647 || price < -2147483648)) {
    return {
      message: "입력값을 확인해주세요.",
      errors: [
        {
          field: "price",
          message: "가격은 0부터 2,147,483,647까지의 정수로 입력해주세요.",
        },
      ],
      values,
    };
  }

  try {
    const response = await fetch(`${apiBaseUrl}/api/products/${productId}`, {
      method: "PUT",
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
        errors: UpdateProductState["errors"];
      } = await response.json();

      return {
        message: errorBody.message,
        errors: errorBody.errors,
        values,
      };
    }

    if (response.status === 404) {
      return {
        message: "상품이 삭제되었거나 존재하지 않습니다.",
        errors: [],
        values,
      };
    }

    if (!response.ok) {
      return {
        message: "수정 요청을 처리하지 못했습니다. 잠시 후 다시 시도해주세요.",
        errors: [],
        values,
      };
    }
  } catch {
    return {
      message: "수정 결과를 확인하지 못했습니다. 상세 화면에서 반영 여부를 확인해주세요.",
      errors: [],
      values,
    };
  }

  revalidatePath("/");
  revalidatePath(`/products/${productId}`);
  revalidatePath(`/products/${productId}/edit`);
  redirect(withProductKeyword(`/products/${productId}`, keyword));
}
