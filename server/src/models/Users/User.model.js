const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const config = require('../../config/config');
const { ErrorHandler } = require('../../helpers/errors/error')

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true },
    lowercase: true,
  },
  password: {
    type: String, required: true
  }
});

UserSchema.pre('save', function(next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(config.authentication.salt_factor, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);

          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password)
  } catch (err) {
    throw new ErrorHandler(500, err, __filename)
  }
};

const User = mongoose.model('User', UserSchema);

module.exports = User;