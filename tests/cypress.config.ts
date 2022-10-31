import { defineConfig } from 'cypress'
import initTestDb from "./initTestDb";
import destroyDb from "./tearDownDb";

export default defineConfig({
  e2e: {
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        async startDatabase() {
          console.log("Initiating test database setup...");
          await initTestDb();
          return null
        },
        async destroyDatabase() {
          console.log("Destroying test database...");
          await destroyDb();
          return null
        },
      });
    },
  },
});
