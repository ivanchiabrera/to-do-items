var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var folderSchema = new Schema({
    description: { type: String },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' }
}, { collection: 'folder' });

module.exports = mongoose.model('Folder', folderSchema);