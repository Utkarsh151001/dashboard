const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, match: /.+\@.+\..+/ },
    phone: { type: String, required: true, match: /^\d{20}$/ },
    age: { type: Number, required: true, min: 1, max: 100 }
});

module.exports = mongoose.model('User', userSchema);
