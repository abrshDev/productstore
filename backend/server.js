import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connect } from "./db/mongoconnect.js";
import cors from "cors";
import productroute from "./route/product.route.js";
const app = express();
const __dirname = path.resolve();
app.use(express.json());
dotenv.config();
//app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const PORT = process.env.PORT || 3000;

app.use("/api/products", productroute);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
  connect();
});
