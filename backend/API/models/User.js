const mongoose = require('mongoose');
const mongAuto = require('mongoose-auto-increment');

const UserSchema = new mongoose.Schema({
    user_id: {
        type: Number, required: true, unique: true, index: true
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username : { type: String, required: true },
    storage_used: { type: Number, default: 0, required: true },
    created_at: { type: Date, required: false, default: Date.now },
    updated_at: { type: Date, required: false, default: Date.now },
    avatar: { type: String, required: false, default: 'default.jpg' }
});

UserSchema.pre('save', function (next) {
    this.updated = Date.now();
    next();
});

mongAuto.initialize(mongoose.connection);

UserSchema.plugin(mongAuto.plugin, { model: 'User', field: 'user_id' });

const User = mongoose.model('User', UserSchema);

module.exports = User;