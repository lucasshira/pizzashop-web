// rota para acessar quantidade de pedidos no dia

import { api } from "@/lib/axios";

export interface GetDayOrdersAmountResponse {
  amount: number;
  diffFromYesterday: number;
}

export async function getDayOrdersAmount() {
  const response = await api.get<GetDayOrdersAmountResponse>('/metrics/day-orders-amount');
  console.log(response);

  return response.data;
}