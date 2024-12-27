// rota para cancelar o pedido

import { api } from "@/lib/axios";

export interface CancelOrderParams {
  orderId: string;
}

export async function cancelOrder({ orderId }: CancelOrderParams) {
  // cancelar pedido nao eh deletar, apenas uma alteracao no status por isso patch
  await api.patch(`/orders/${orderId}/cancel`);
};

// nao eh necessario retornar nada, pois nao precisamos de dados de volta do backend