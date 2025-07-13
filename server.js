import express from "express";
import cors from "cors";
import fetch from "node-fetch";
require("dotenv").config();


const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
const NEWS_KEY = process.env.NEWS_KEY; // store safely in Render

// GET /news?q=ai
app.get("/news", async (req, res) => {
  try {
    const q = req.query.q || "technology";
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&apiKey=${NEWS_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "API error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const cors = require('cors');
app.use(cors());
