const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AutoIncrement = require('../../db/db').getAutoInc();

const UserSchema = new mongoose.Schema({
    user_id: {
        type: Number
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username : { type: String, required: true },
    storage_used: { type: Number, default: 0, required: true },
    created_at: { type: Date, required: false, default: Date.now },
    updated_at: { type: Date, required: false, default: Date.now },
    avatar: { type: String, required: false, default: 'default.jpg' }
});

UserSchema.pre('save', async function (next) {
    this.updated_at = Date.now();
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.plugin(AutoIncrement, { inc_field: 'user_id' });

const User = mongoose.model('User', UserSchema);

module.exports = User;