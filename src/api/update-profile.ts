// funcao para atualizacao do perfil

import { api } from "@/lib/axios";

export interface UpdateProfileBody {
  name: string;
  description: string | null;
}

export async function UpdateProfile({ name, description }: UpdateProfileBody) {
  await api.put<UpdateProfileBody>('profile', { name, description })
}