import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,   // note: client listens on 5173 by default
    open: false,   // automatically open the browser to the url on start
    proxy: {
      "/graphql": { // graphql endpoint rules
        target: "http://localhost:3001",  // backend's port
        secure: false,
        changeOrigin: true,
      },
    },
  },
})
console.log("vite.config.js");