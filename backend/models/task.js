var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    description: { type: String },
    done: { type: Boolean },
    id_user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { collection: 'task' });

module.exports = mongoose.model('Task', taskSchema);