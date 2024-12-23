// funcao para buscar os dados do perfil do usuario logado

import { api } from "@/lib/axios";

interface GetManagedRestaurantResponse {
  id: string;
  name: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  description: string | null;
  managerId: string | null;
}

export async function getManagedRestaurant() {
  // tipando o retorno do data
  const response = await api.get<GetManagedRestaurantResponse>('/managed-restaurant');

  return response.data;
}