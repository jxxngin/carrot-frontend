import { JAVA_INT_MAX } from "./number-limits";

export const MAX_PRODUCT_PRICE = JAVA_INT_MAX;

export const PRODUCT_PRICE_ERROR_MESSAGE = `가격은 0부터 ${MAX_PRODUCT_PRICE.toLocaleString("ko-KR")}까지의 정수로 입력해주세요.`;
