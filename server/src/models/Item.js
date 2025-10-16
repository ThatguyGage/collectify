import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Item", ItemSchema);
