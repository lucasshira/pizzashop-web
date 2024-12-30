// rota para entregar o pedido

import { api } from "@/lib/axios";

export interface DeliverOrderParams {
  orderId: string;
}

export async function deliverOrder({ orderId }: DeliverOrderParams) {
  await api.patch(`/orders/${orderId}/deliver`);
};

// nao eh necessario retornar nada, pois nao precisamos de dados de volta do backend