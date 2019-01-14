const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    user_name: {type: String, default:''},
    mobile_no: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    user_type: {type: String, required: true},
    createdAt: {type: String, default: new Date()},
    updated_time:{type: String, default: new Date()}
});


// Export the model
module.exports = mongoose.model('Users', UserSchema);