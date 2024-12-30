// rota para aprovar o pedido

import { api } from "@/lib/axios";

export interface ApproveOrderParams {
  orderId: string;
}

export async function approveOrder({ orderId }: ApproveOrderParams) {
  await api.patch(`/orders/${orderId}/approve`);
};

// nao eh necessario retornar nada, pois nao precisamos de dados de volta do backend