import { api } from "@/lib/axios";

export interface DispatchOrderParams {
  orderId: string;
}

export async function dispatchOrder({ orderId }: DispatchOrderParams) {
  await api.patch(`/orders/${orderId}/dispatch`);
};

// nao eh necessario retornar nada, pois nao precisamos de dados de volta do backend