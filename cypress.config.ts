import { defineConfig } from "cypress";
import viteConfig from "./vite.config";

export default defineConfig({
  // Define a formattter for the reports.
  // Mochawesome provides a polished HTML report, and it's compatible with Cypress.
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    mochawesomeFileOptions: {
      json: true,
      html: false
    }
  },
  
  component: {
    port: 5173,
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig,
    },
  },

  e2e: {
    // baseUrl uses the frontend (vite) testing (dev mode only, of course!)
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
