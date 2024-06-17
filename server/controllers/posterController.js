const Poster = require("../models/posters");
const asyncHandler = require("express-async-handler");
const fs = require('fs');
const path = require('path');
const axios = require("axios");

//GET 'posts/'
exports.getAllPosters = asyncHandler(async (req, res, next) => {
  const posters = await Poster.find();
  res.json(posters);
});

//POST 'posts/'
exports.createPoster = asyncHandler(async (req, res, next) => {
  const { prompt } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  const postData = {
    model: "dall-e-2",
    prompt: `Create an 80's cartoon style posterized ${prompt}`,
    n: 1,
    size: "256x256",
  };

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      postData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const imageUrl = response.data.data[0].url;

    // Download the image and save it locally
    const imagePath = path.resolve(
      __dirname,
      "downloaded_images",
      `downloaded-image-${Date.now()}.png`
    );
    const writer = fs.createWriteStream(imagePath);

    const imageResponse = await axios({
      method: "get",
      url: imageUrl,
      responseType: "stream",
    });
    imageResponse.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    // After download, send the local path or serve the image directly
    res.sendFile(imagePath);
    // try{
    //     const newPoster = await Poster.create({
    //         prompt,
    //         image,
    //     });
    //     res.status(201).json(newPoster);
    // }
    // catch(error){
    //     res.status(400).json({ message: error.message });
    // }
    // console.log(response.data);
    //res.json(response.data);  // Axios wraps the response data in a 'data' attribute
  } catch (error) {
    console.error("Error making API request:", error);
    res.status(500).json({ error: "Failed to connect to OpenAI API" });
  }
});
