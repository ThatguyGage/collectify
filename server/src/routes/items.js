import { Router } from "express";
import Item from "../models/Item.js";

const router = Router();

router.get("/", async (req, res) => {
  const { q = "", category = "" } = req.query;
  const filter = {
    ...(q ? { name: { $regex: q, $options: "i" } } : {}),
    ...(category ? { category } : {})
  };
  const items = await Item.find(filter).sort({ createdAt: -1 });
  res.json(items);
});

router.post("/", async (req, res) => {
  const item = await Item.create(req.body);
  res.status(201).json(item);
});

router.put("/:id", async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

router.delete("/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;
