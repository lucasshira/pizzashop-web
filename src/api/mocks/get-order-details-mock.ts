import { http, HttpResponse } from "msw";

import { GetOrderDetailsParams, GetOrderDetailsResponse } from "../get-order-details";


export const getOrderDetailsMock = http.get<GetOrderDetailsParams, never, GetOrderDetailsResponse>('/orders/:orderId', ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '77345983'
    },
    status: 'pending',
    totalInCents: 5000,
    createdAt: new Date().toISOString(),
    orderItems: [
      {
        id: 'order-item-1',
        priceInCents: 1000,
        quantity: 10,
        product: {
          name: 'Pizza Pepperoni'
        }
      },
      {
        id: 'order-item-2',
        priceInCents: 2000,
        quantity: 4,
        product: {
          name: 'Pizza Calabresa'
        }
      },
    ]
  });
});

