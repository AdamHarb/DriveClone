const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user_id: {
        type: Number, required: true, unique: true, index: true, default: function () {
            return this.model('User').countDocuments({}) + 1;
        }
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    storage_used: { type: Number, default: 0, required: true },
    created_at: { type: Date, required: false, default: Date.now },
    updated_at: { type: Date, required: false, default: Date.now }
});

UserSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;