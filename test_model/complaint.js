const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let complaintSchema = new Schema({
    description: {type: String, default:""},
    heading: {type: String, required: true},
    status: {type: Boolean, default: false},
    user_id:{ type:String,default:""},
    createdAt: {type: String, default: new Date()},
    updatedAt:{type: String, default: new Date()}
});


// Export the model
module.exports = mongoose.model('Complaints', complaintSchema);