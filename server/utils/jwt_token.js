import jwt from 'jsonwebtoken'
import config from '../config'

var get = (user) => {
  let token = jwt.sign(user, config.get("jwtSecret"), {
    expiresIn: 10080
  })
  return 'JWT ' + token
}

export default {
    get: get
  }
