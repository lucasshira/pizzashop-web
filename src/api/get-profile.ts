// funcao para buscar os dados do perfil do usuario logado

import { api } from "@/lib/axios";

interface GetProfileResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'manager' | 'customer';
  createdAt: Date | null;
  updatedAt: Date | null;
}

export async function getProfile() {
  // tipando o retorno do data
  const response = await api.get<GetProfileResponse>('/me');

  return response.data;
}