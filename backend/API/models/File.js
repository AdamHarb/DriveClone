const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    file_id: {
        type: Number, required: true, unique: true, index: true, default: function () {
            return this.model('File').countDocuments({}) + 1;
        }
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: false, default: null },
    name: { type: String, required: true },
    mime_type: { type: String, required: true },
    size: { type: Number, required: true },
    uploaded_at: { type: Date, required: false, default: Date.now },
    updated_at: { type: Date, required: false, default: Date.now }
});

FileSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

const File = mongoose.model('File', FileSchema);

module.exports = File;