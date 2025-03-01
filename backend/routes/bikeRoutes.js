import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Bike from "../models/Bike.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.post("/sell", authMiddleware, upload.single("image"), async (req, res) => {
    try {
        if (!req.user.isDealer) {
            return res.status(403).json({ message: "Only dealers can sell bikes." });
        }
        const { title, brand, model, price, year, mileage, description } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;
        const newBike = new Bike({ title, brand, model, price, year, mileage, description, image, dealerId: req.user.id });
        await newBike.save();
        res.status(201).json({success: true, message: "Bike added successfully", bike: newBike});
    } catch (error) {
        res.status(500).json({success: false, message: error.message });
    }
});

router.use("/uploads", express.static(uploadDir));

router.get("/bikes", async (req, res) => {
        try {
            let query = {};
    
            // Filters
            if (req.query.brand) query.brand = req.query.brand;
            if (req.query.year) query.year = req.query.year;
            if (req.query.minPrice && req.query.maxPrice) {
                query.price = { $gte: req.query.minPrice, $lte: req.query.maxPrice };
            }
            if (req.query.search) {
                query.$or = [
                    { title: { $regex: req.query.search, $options: "i" } },
                    { model: { $regex: req.query.search, $options: "i" } }
                ];
            }
    
            const bikes = await Bike.find(query).populate("dealerId", "name email");
            res.status(200).json(bikes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const bike = await Bike.findById(req.params.id);
        if (!bike) {
            return res.status(404).json({ message: "Bike not found." });
        }

        if (bike.dealerId.toString() !== req.user.id) {
            return res.status(403).json({ message: "You can only delete your own bikes."});
        }

        if (bike.image) {
            const imagePath = path.join("uploads", path.basename(bike.image));
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Bike.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Bike deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;