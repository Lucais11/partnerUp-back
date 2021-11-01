import mongoose from "mongoose";
const { Schema } = mongoose;

const macSchema = new Schema({
  kind: {
    type: String,
    required: true,
    enum: ["laptop", "desktop", "all-in-one", "mac mini"],
  },
  price: {
    type: Number,
    required: true,
    min: 900,
    max: 2000,
  },
  color: {
    type: String,
    required: true,
    enum: ["black", "silver", "gold"],
  },
});

export const Mac = mongoose.model("mac", macSchema);
