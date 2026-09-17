"use server";

import { withProductKeyword } from "@/lib/product-search";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DeleteProductState } from "./delete-state";

export async function deleteProduct(
  productId: number,
  keyword: string,
): Promise<DeleteProductState> {
  if (!Number.isSafeInteger(productId) || productId <= 0) {
    return {
      message: "유효하지 않은 상품 ID입니다.",
    };
  }

  const apiBaseUrl = process.env.API_BASE_URL;

  if (!apiBaseUrl) {
    return {
      message: "서버 연결 설정을 확인해주세요.",
    };
  }

  try {
    const response = await fetch(`${apiBaseUrl}/api/products/${productId}`, {
      method: "DELETE",
    });

    if (!response.ok && response.status !== 404) {
      return {
        message: "삭제 요청을 처리하지 못했습니다. 잠시 후 다시 시도해주세요.",
      };
    }
  } catch {
    return {
      message: "삭제 결과를 확인하지 못했습니다. 목록에서 상품이 남아 있는지 확인해주세요.",
    };
  }

  revalidatePath("/");
  revalidatePath(`/products/${productId}`);
  revalidatePath(`/products/${productId}/edit`);
  redirect(withProductKeyword("/", keyword));
}
