const mongoose = require('mongoose');

const FolderSchema = new mongoose.Schema({
    folder_id: {
        type: Number, required: true, unique: true, index: true, default: function () {
            return this.model('Folder').countDocuments({}) + 1;
        }
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: false },
    name: { type: String, required: true },
    created_at: { type: Date, required: false, default: Date.now },
    updated_at: { type: Date, required: false, default: Date.now }
});

FolderSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

const Folder = mongoose.model('Folder', FolderSchema);

module.exports = Folder;
