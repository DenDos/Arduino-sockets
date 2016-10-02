import mongoose, { Schema } from 'mongoose'
import validate from 'mongoose-validator'
import uniqueValidator from 'mongoose-unique-validator'
import crypto from 'crypto'

var schemaOptions = {
  toObject: {
    virtuals: true
  },toJSON: {
    virtuals: true
  }
};

// VALIDATIONS

var nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [2, 20],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'Name should contain alpha-numeric characters only'
  })
];

var User = new Schema({
  email:
  {
    type: String,
    unique: true,
    required: true
  },
  avatar:
  {
    type: String
  },
  first_name:
  {
    type: String, required: true, validate: nameValidator
  },
  last_name:
  {
    type: String
  },
  hashedPassword:
  {
    type: String,
    required: true
  },
  salt:
  {
    type: String,
    required: true
  },
  contacts: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'approved'],
      default: 'pending'
    }
  }],
  created:
  {
    type: Date,
    default: Date.now
  }
}, schemaOptions)

User.plugin(uniqueValidator, { message: '{PATH} is already used.' })


User.virtual('password').set(function(password){
  this._plainPassword = password
  this.salt = Math.random() + ''
  this.hashedPassword = this.encryptPassword(password)
}).get(function() {
  this._plainPassword
})

User.virtual('fullname')
    .set(function(fullname) {
        let names = fullname.split(" ")
        if(names.length > 0){
          this.first_name = names[0];
        }else{
          this.first_name = "Name";
        }
        if(names.length > 1){
          this.last_name  = names[1];
        }else{
          this.last_name  = null;
        }
    })
    .get(function() { return this.first_name + ' ' + this.last_name; });


User.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
}

User.methods.checkPassword = function(password){
  if(!password || password == undefined){
     return false
  }else{
    return this.encryptPassword(password) == this.hashedPassword
  }
}

export default mongoose.model('User', User)
