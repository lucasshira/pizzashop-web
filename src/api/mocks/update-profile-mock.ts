// Mock para registro de restaurante

import { http, HttpResponse } from "msw";

import { UpdateProfileBody } from "../update-profile";

// ordem => parametros, body, resposta
export const updateProfileMock = http.put<never, UpdateProfileBody>(
  "/profile", async ({ request }) => {
    const { name } = await request.json();

    if (name === 'Rocket Pizza') {
      return new HttpResponse(null, { status: 204 })
    }

    return new HttpResponse(null, { status: 400 })
  }
);
