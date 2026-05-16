const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 10000;

const allowedOrigins = (process.env.CLIENT_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json({ limit: "1mb" }));

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    village: { type: String, trim: true },
    crop: { type: String, required: true, trim: true },
    issueType: { type: String, required: true, trim: true },
    stage: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);

app.get("/", (req, res) => {
  res.json({ status: "ok", service: "Shiv Mahima Farm API" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/inquiries", async (req, res) => {
  try {
    const inquiry = await Inquiry.create({
      name: req.body.name,
      phone: req.body.phone,
      village: req.body.village,
      crop: req.body.crop,
      issueType: req.body.issueType,
      stage: req.body.stage,
      message: req.body.message,
    });

    res.status(201).json({ message: "Inquiry saved", id: inquiry._id });
  } catch (error) {
    res.status(400).json({ message: "Could not save inquiry" });
  }
});

async function startServer() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is required");
  }

  await mongoose.connect(process.env.MONGODB_URI);
  app.listen(port, () => {
    console.log(`API running on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error(error);
  process.exit(1);
});
