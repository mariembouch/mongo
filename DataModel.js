//to structre our data 
const mongoose = require("mongoose");
const DataSchema = new mongoose.Schema({
 
        prenom: {
            type: String,
            required: true
        },
        nom: {
            type: String,
            required: true
        },
        Email: {
            type: String,
            required: true
        },
        CIN: {
            type: String, // Represent CIN as a string
            required: true
        },
        Gender: {
            type: String,
            required: true
        },
        valid: {
            type: Number,
            default: 0 // Provide a default value

        }
 
    
});

module.exports = mongoose.model("DataModel", DataSchema);

