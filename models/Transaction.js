const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    price: {
      type: String,
      required: true,
    },
    details: {
        type: String,
        required: true,
    },
    typeOf: {
      type: String,
      enum: ['buying','selling','giving'],
      required: true
    },
    image: {
        type: [String],
        required: false,
    },
    cloudinaryId: {
        type: [String],
        required: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("Transactions", TransactionSchema)