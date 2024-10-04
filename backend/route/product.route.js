import express from "express";
import {
  createproduct,
  deleteproduct,
  getproduct,
  updateproduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", createproduct);
router.get("/", getproduct);
router.put("/:id", updateproduct);
router.delete("/:id", deleteproduct);

export default router;
