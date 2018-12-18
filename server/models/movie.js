const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageURL: String,
    year: Number,
    directorId: String
});

module.exports = mongoose.model("Movie", movieSchema);