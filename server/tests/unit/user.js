import { expect } from 'chai'
import User from '../../models/user.js'

describe('User', () => {
  describe('#checkPassword()', () => {
    // TODO: Use fixtures here
    var user = new User({
      first_name:  "Ilya",
      last_name:   "Sayapin",
      address:     "Your Mom house",
      password:    "Whoisyourdaddy",
      email:       "comeonandroid@gmail.com"
    })

    user.save((err, user) => {
      if(err) {
        console.log(err)
      }
      return Promise.resolve(user);
    }).then( (user) => {
      console.log(user)
    })
  })
})    