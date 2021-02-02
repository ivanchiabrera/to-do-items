var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: { type: String },
    password: { type: String }
}, { collection: 'user' });

module.exports = mongoose.model('User', userSchema);