const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

admin.initializeApp(); // Initializes Firebase admin SDK
const db = admin.firestore(); // use .database() for RTDB

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from public (if needed in Cloud Functions — optional)
app.use(express.static("public"));

app.post("/feedback", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send("Missing fields.");
  }

  try {
    await db.collection("feedbacks").add({
      name,
      email,
      message,
      createdAt: new Date()
    });
    res.send("✅ Feedback submitted successfully!");
  } catch (err) {
    console.error("Error saving feedback:", err);
    res.status(500).send("❌ Failed to save feedback.");
  }
});

// Optional: Catch-all route
app.use((req, res) => {
  res.status(404).send("Page not found");
});

exports.api = functions.https.onRequest(app);
