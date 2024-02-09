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


// Route to update all patients' valid field to 1 in MongoDB
app.put('/validate/all', async (req, res) => {
  try {
    // Update all patients' valid field to 1
    await DataModel.updateMany({}, { valid: 1 });
    res.status(200).json({ message: 'All patients validated successfully!' });
  } catch (error) {
    console.error('Error while validating all patients:', error);
    res.status(500).json({ error: 'Server error while validating all patients' });
  }
});


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
    const { prenom, nom, Email, CIN, Gender ,valid} = req.body;
    const newData = new DataModel({ prenom, nom, Email, CIN, Gender, valid});
    await newData.save();
    res.json({ message: "Data saved successfully" });
  } catch (error) {
    console.log("Error while saving data:", error.message);
    res.status(500).send("Server error while saving data");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on PORT: ${PORT}`);
});
