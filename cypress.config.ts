import { defineConfig } from "cypress";
import { seed } from "./prisma/test-utils/seed";
import { resetDatabase } from "./prisma/test-utils/resetDatabase";

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

        async "db:seed"(payload) {
          await seed(payload);
          return null;
        },
      });
    },
  },
});
