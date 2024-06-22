const Poster = require("../models/posters");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { S3Client, ListObjectsV2Command, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { Upload } = require("@aws-sdk/lib-storage");

const s3Client = new S3Client({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
});

//GET 'posts/'
exports.getAllPosters = asyncHandler(async (req, res, next) => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.AWS_BUCKET_NAME,
    });
    const { Contents } = await s3Client.send(command);
    console.log(Contents); // enable access to the list of objects
    const urls = await Promise.all(
      Contents.map(async (item) => {
        const urlCommand = new GetObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: item.Key,
        });
        const signedUrl = await getSignedUrl(s3Client, urlCommand, { expiresIn: 3600 });
        return { key: item.Key, url: signedUrl };
      })
    );
    const urlsOnly = urls.map((url) => url.url);
    res.json({ urlsOnly });
  } catch (error) {
    console.error("Error listing bucket contents:", error);
    res.status(500).send("Failed to list images");
  }
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
    const response = await axios.post("https://api.openai.com/v1/images/generations", postData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const imageUrl = response.data.data[0].url;

    // Stream the image directly to S3 using the Upload class
    const imageResponse = await axios({
      method: "get",
      url: imageUrl,
      responseType: "stream",
    });

    const bucketName = process.env.AWS_BUCKET_NAME;
    const objectKey = `downloaded-image-${Date.now()}.png`;

    const uploader = new Upload({
      client: s3Client,
      params: {
        Bucket: bucketName,
        Key: objectKey,
        Body: imageResponse.data,
        ContentType: "image/jpeg", // To prevent downloading
      },
    });

    await uploader.done();

    // Generate a signed URL for the uploaded image
    const signedUrl = await getSignedUrl(
      s3Client,
      new GetObjectCommand({
        Bucket: bucketName,
        Key: objectKey,
      }),
      { expiresIn: 3600 }
    ); // URL valid for 1 hour

    // Respond with the signed URL
    res.json({ imageUrl: signedUrl });
  } catch (error) {
    console.error("Error making API request:", error);
    res.status(500).json({ error: "Failed to connect to OpenAI API or upload to S3" });
  }
});
