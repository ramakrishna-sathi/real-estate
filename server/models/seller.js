const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
    place: {
        type: String,
        required: true
    },
    Area: {
        type: String,
        required: true,
        unique: true
    },

    Bedrooms: {
        type: String,
        required: true
    },
    Bathrooms: {
        type: String,
        required: true
    },
    NearbyFacilities: {
        type: String,
        required: true
    }
});

const Sellers = mongoose.model("Seller",sellerSchema);


module.exports = Sellers;