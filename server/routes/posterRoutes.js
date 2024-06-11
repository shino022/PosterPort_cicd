const express = require("express");
const router = express.Router();
const axios = require('axios');

//Route to handle post form submission
router.post("/submit", async (req, res) => {
  const prompt = req.body.prompt;
  const apiKey = process.env.OPENAI_API_KEY;

  const postData = {
    model: "dall-e-2",
    prompt: `Create an 80's cartoon style posterized ${prompt}`,
    n: 1,
    size: "256x256",
  };

  try {
    const response = await axios.post("https://api.openai.com/v1/images/generations", postData, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      }
    });
    res.json(response.data);  // Axios wraps the response data in a 'data' attribute
  } catch (error) {
    console.error('Error making API request:', error);
    res.status(500).json({ error: 'Failed to connect to OpenAI API' });
  }
});

module.exports = router;