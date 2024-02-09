const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const DataModel = require("./DataModel");
const connectDB = require("./Database");
connectDB();

const app = express();
app.use(express.json({ extended: false }));

//we need cors middleware here because frontend and backend run on different ports.
const cors = require("cors");
app.use(cors());

// Endpoint to fetch all data from the database
app.get("/alldata", async (req, res) => {
  try {
    const allData = await DataModel.find();
    res.json(allData);
  } catch (error) {
    console.error("Server error while fetching all data", error);
    res.status(500).send("Server error while fetching all data");
  }
});

app.get("/readfromserver", (req, res) => {
  res.json({ message: "Hey woman from server" });
});

app.post("/writetodatabase", async (req, res) => {
  try {
    const { content } = req.body;
    const newData = new DataModel({ content });
    await newData.save();
    res.json({ message: "Data saved successfully " });
  } catch (error) {
    console.log("Server error while saving data", error.message);
    res.status(500).send("Server error while saving data");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on PORT: ${PORT}`);
});