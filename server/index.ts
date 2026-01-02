import { findAvailablePort } from "./_core/index.js";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

findAvailablePort(PORT)
  .then((port) => {
    console.log(`Server started on port ${port}`);
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
