import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { name, email, password, isDealer } = req.body;

        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, isDealer});
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
}
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, isDealer: user.isDealer }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, isDealer: user.isDealer }});
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
});

router.post("/facebook-delete-data", async (req, res) => {
  try {
      const { fb_user_id } = req.body;

      if (!fb_user_id) {
          return res.status(400).json({ message: "User ID is required" });
      }

      const user = await User.findOne({ facebookId: fb_user_id });

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      await User.deleteOne({ facebookId: fb_user_id });

      return res.json({
          url: "https://dcent.in/delete-confirmation", // Custom confirmation page
          message: "User data deletion request successful."
      });
  } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    try {
      let user = await User.findOne({ googleId: req.user.googleId });

            if (!user) {
                user = new User({
                    name: req.user.name,
                    email: req.user.email,
                    googleId: req.user.googleId,
                });
                await user.save();
            }
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.redirect(`https://localhost:3000/login-success?token=${token}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
}}
);

// Facebook Auth
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));

router.get("/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.redirect(`https://localhost:3000/login-success?token=${token}`);
  }
);

export default router;