// arquivo inicial do Mocks Service Worker

import { setupWorker } from 'msw/browser';

import { env } from '@/env';

export const worker = setupWorker();

// a partir dessa funcao, todas as requisicoes feitas seram interceptadas pelo MSWorker
export async function enableMSW() {
  if (env.MODE !== 'test') return;
  
  await worker.start();
}