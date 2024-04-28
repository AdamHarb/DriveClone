const mongoose = require('mongoose');
const AutoIncrement = require('../../db/db').getAutoInc();

const FolderSchema = new mongoose.Schema({
    folder_id: {
        type: Number
    },
    user_id: { type: Number, ref: 'User', required: true },
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

FolderSchema.plugin(AutoIncrement, { inc_field: 'folder_id' });

const Folder = mongoose.model('Folder', FolderSchema);

module.exports = Folder;
