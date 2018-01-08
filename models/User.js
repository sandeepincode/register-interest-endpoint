const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
  },
  fName: {
    type: String,
    required: false,
    trim: true,
  },
  sName: {
    type: String,
    required: false,
    trim: true,
  },
  phoneNumber :{
    type: String,
    required: false,
    trim: true,
  },
  registered: {
    type: Date,
    default: Date.now,
  },
});

/* eslint-disable */
UserSchema.pre('save', function (next) {
  User.findOne({
    email: userEmail,
  }).exec((err, user) => {
    if (err) {
      return callback(err);
    } else if (user) {
      return callback({
        response: 0,
        msg: 'Sorry! But this email address was already registered',
      });
    } else {
      next();
    }
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
