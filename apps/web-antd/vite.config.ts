import { defineConfig } from '@vben/vite-config';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            // 前端 /api/admin/* → si_land_server /api/v1/admin/*
            rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
            target: 'http://127.0.0.1:8080',
            ws: true,
          },
        },
      },
    },
  };
});
