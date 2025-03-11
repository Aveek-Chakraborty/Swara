import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./utils/schema.ts",
    dialect: 'postgresql',
    dbCredentials: {
      url: process.env.Db_URL as string,
    }
});
