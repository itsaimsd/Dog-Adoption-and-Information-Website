const mongoose = require('mongoose');
const ListSchema = new mongoose.Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    responseCodes: [String],
    images: [String],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});


module.exports = mongoose.model('List', ListSchema);
