import mongoose, { Schema } from "mongoose"

const CounterSchema = new Schema(
  {
    number: Number,
    colour: String
  }
);

const Counters = mongoose.models.Counters || mongoose.model("Counters", CounterSchema)

export default Counters