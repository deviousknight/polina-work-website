import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import { writeFileSync, mkdirSync } from 'node:fs';

export default defineConfig(() => {
  const base = process.env.VITE_BASE_PATH || '/';
  return {
    base,
    build: {
      rollupOptions: {
        input: {
          ru: fileURLToPath(new URL('./index.html', import.meta.url)),
          pl: fileURLToPath(new URL('./pl/index.html', import.meta.url)),
        },
      },
    },
    plugins: [react(), tailwindcss(), {
      name: 'legacy-route-redirect',
      closeBundle() {
        mkdirSync('dist/portfolio', { recursive: true });
        writeFileSync('dist/portfolio/index.html', `<!doctype html><html lang="ru"><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${base}#consultations"><title>Консультации психолога</title><a href="${base}#consultations">Перейти к консультациям психолога</a></html>`);
      },
    }],
  };
});
