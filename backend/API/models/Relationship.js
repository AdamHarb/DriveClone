const mongoose = require('mongoose');

const RelationshipSchema = new mongoose.Schema({
    file_id: { type: mongoose.Schema.Types.ObjectId, ref: 'File', required: true },
    shared_with: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }],
    permission: { type: String, required: true },
    created_at: { type: Date, required: false, default: Date.now }
});

const Relationship = mongoose.model('Relationship', RelationshipSchema);

module.exports = Relationship;
