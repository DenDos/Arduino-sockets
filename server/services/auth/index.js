import passportJWT from "passport-jwt"
import User   from "../../models/user"
import config from "../../config"
var ExtractJwt     = passportJWT.ExtractJwt
var Strategy       = passportJWT.Strategy

var params = {
  secretOrKey: config.get("jwtSecret"),
  jwtFromRequest: ExtractJwt.fromAuthHeader()
}

module.exports = (passport) => {
  passport.use(new Strategy(params, (payload, done) => {
      User.findOne({ _id: payload._doc._id }, (err, user) => {
          if (err) {
            return done(err, false)
          }
          if (user) {
            done(null, user)
          }else {
            done(null, false)
          }
        })
      }
    )
  )
}
