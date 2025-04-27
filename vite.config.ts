import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuração personalizada para o projeto React usando Vite
export default defineConfig({
  plugins: [
    react(), // Plugin oficial do Vite para React
  ],
  server: {
    port: 3000, // Porta escolhida para o servidor de desenvolvimento
    open: true, // Abre o navegador automaticamente ao iniciar o servidor
  },
});