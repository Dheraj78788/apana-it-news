const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public")); // to serve index.html, etc.

app.post("/feedback", (req, res) => {
  const { name, email, message } = req.body;
  const feedback = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n---\n`;

  fs.appendFile("feedback.txt", feedback, (err) => {
    if (err) return res.status(500).send("Error saving feedback");
    res.send("✅ Feedback submitted successfully!");
  });
});

// Optional: catch invalid routes
app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
