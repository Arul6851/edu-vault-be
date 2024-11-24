import app from "./app.js";
import { config } from "dotenv";
import prisma from "./middleware/prisma.js";

config();
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running in port "${PORT}"`));

process.on("SIGINT", () => {
  prisma.$disconnect();
  console.log("Prisma Disconnected.");
  process.exit(0);
});
