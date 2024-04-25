const mongoose = require('mongoose');
const mongAuto = require('mongoose-auto-increment');

const FolderSchema = new mongoose.Schema({
    folder_id: {
        type: Number, required: true, unique: true, index: true
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    folder_name: { type: String, required: true },
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: false },
    created_at: { type: Date, required: false, default: Date.now },
    updated_at: { type: Date, required: false, default: Date.now },
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }]
});

FolderSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

FolderSchema.plugin(mongAuto.plugin, { model: 'Folder', field: 'folder_id' });
const Folder = mongoose.model('Folder', FolderSchema);

module.exports = Folder;
