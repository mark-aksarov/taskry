import { defineConfig } from "cypress";
import { seedE2E } from "./prisma/e2e/seed";
import { E2ESeedPayload } from "./prisma/e2e/types";
import { resetDatabase } from "./prisma/resetDatabase";

export default defineConfig({
  e2e: {
    experimentalRunAllSpecs: true,
    defaultCommandTimeout: 10000,
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on) {
      on("task", {
        async "db:reset"() {
          await resetDatabase();
          return null;
        },

        async "db:seed"(payload: E2ESeedPayload) {
          await seedE2E(payload);
          return null;
        },
      });
    },
  },
});
