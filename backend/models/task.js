var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    description: { type: String },
    done: { type: Boolean },
    folder_id: { type: Schema.Types.ObjectId, ref: 'Folder' }
}, { collection: 'task' });

module.exports = mongoose.model('Task', taskSchema);