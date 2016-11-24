var mongoose = require('mongoose');

var User = new Schema({
  username : { type: String, lowercase:true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, default: 'user' },
  hashedPassword: { type: String, required: true }
});

var schema = new mongoose.Schema(User);

module.exports = schema;
module.exports.UserSchema = User;
