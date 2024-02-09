//to structre our data 
const mongoose = require("mongoose");
const DataSchema = new mongoose.Schema({
    content: {
        //type of the data that you want to save on your data base 
        type: String,
        //we want that the db accept only the data which is not empty 
        required: true
    }
});
module.exports = mongoose.model("DataModel", DataSchema);