import mongoose from "mongoose";

const bikeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    year: { type: Number, required: true },
    mileage: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
    dealerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Bike", bikeSchema);