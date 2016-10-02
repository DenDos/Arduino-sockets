import token  from '../../utils/jwt_token'
import config from '../../config'
import jwt    from 'jsonwebtoken'
import User   from '../../models/user'


import _      from 'underscore'


var upload = require('../../services/uploader').single('file');
var log    = require('../../utils/log')(module)

exports.test = (req, res,next) => {
    res.json({
    success: true,
    message: "asdfasdf"
  })
}

/**
 * @api {post} /api/authenticate Request User authentication
 * @apiName UserAuth
 * @apiGroup User
 *
 * @apiParam {String} email Users unique email.
 * @apiParam {String} password Users password.
 *
 * @apiSuccess {Boolean} success Status operation.
 * @apiSuccess {String} message  Error message if success false.
 * @apiSuccess {String} token  Unique Token if  user authenticatied.
 * @apiSuccess {Object} user  Return User.
*/

// # Auth
exports.authenticate = (req, res,next) => {

  User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        throw(err)
      }

      if(!user) {
        res.send({
          success: false,
          message: 'Authentication failed. User not found.'
        })
      }else {
        if (!user.checkPassword(req.body.password)) {
          res.send({
            success: false,
            message: 'Authentication failed. Passwords did not match.'
          })
        }else {
          res.json({
            success: true,
            token: token.get(user),
            user: user
          })
        }
      }
    }
  )
}


/**
* @api {get} /api/protected/current_user Request Current User
 * @apiName UserGetCurrent
 * @apiGroup User
 *
 * @apiSuccess {Object} user Current User .
*/

exports.current_user = (req, res, next) => {
  res.json({
    user: req.user
  })
}

/**
* @api {get} /api/protected/user/:id Request User information
 * @apiName UserGet
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {Boolean} success Status operation.
 * @apiSuccess {Object} user Return User if success .
 * @apiSuccess {String} message  Error message if success false.
*/

exports.get_user = (req, res,next) => {
  let id  = req.params.id
  User.findOne({_id: id.toString()}, (err, user) => {
      if (err){
        return next(err)
      }

      if (!user || user.length < 1){
        res.json({ success: false, msg: 'User not found'})
      }else {
        res.json({
          success: true,
          user: user
        })
      }
    }
  )
}

/**
  * @api {get} /api/users Request all Users
 * @apiName UserGetAll
 * @apiGroup User
 *
 * @apiSuccess {Boolean} success Status operation.
 * @apiSuccess {Array} users Return all users .
 * @apiSuccess {String} message  Error message if success false.
*/

exports.all = (req, res,next) => {
  User.find({}, (err, users) => {
      if (err) {
        return next(err)
      }
      if (!users || users.length < 1) {
        res.json({
           success: false,
           msg: 'Users not found'
       })
      }else {
        res.json({
          success: true,
          users: users
        })
      }
    }
  )
}


/**
 * @api {put} /api/protected/user Request To update User
 * @apiName UserUpdate
 * @apiGroup User
 *
 * @apiParam {String} fullname User fullname.
 * @apiParam {String} description User description.
 *
 * @apiSuccess {Boolean} success Status operation.
 * @apiSuccess {String} message  Error message if success false.
 * @apiSuccess {Object} user  Return User if OK
 * @apiSuccess {Object} error  Full Errors messages from mongo with validation.

*/

exports.update = (req, res,next) => {
  upload(req,res,function(err){
    let current_user = req.user

    const attrs = _.reduce(
      ['fullname','description'],
      (acc, key) => {
        if (key in req.body)
          acc[key] = req.body[key]
        return acc
      },
      {}
    )
    current_user = Object.assign(current_user, attrs)
    if(req.file){
      current_user.avatar = '/uploads/' + req.file.filename
    }
    current_user.save((err, user) => {
      if (err){
        return next(err)
      }
      res.json({
        success: true,
        user: user
      })
    })
  })
}

/**
 * @api {post} /api/users Request To create User
 * @apiName UserCreate
 * @apiGroup User
 *
 * @apiParam {String} first_name User first_name.
 * @apiParam {String} last_name User last_name.
 * @apiParam {String} address User address.
 * @apiParam {String} email Users unique email REQUIRED.
 * @apiParam {String} password Users password REQUIRED.
 *
 * @apiSuccess {Boolean} success Status operation.
 * @apiSuccess {String} message  Error message if success false.
 * @apiSuccess {String} token  Unique Token if  user authenticatied.
 * @apiSuccess {Object} error  Full Errors messages from mongo with validation.

 * @apiSuccess {String} token  Unique Token if  user authenticatied.
*/

exports.add = (req, res,next) => {
  let user = new User({
      first_name:  req.body.first_name,
      last_name:  req.body.last_name,
      password:  req.body.password,
      email:     req.body.email
    }
  )
  user.save((err, added_user) => {
    if (err) {
      log.error(`save user problem ${err}`)
      res.json({
        success: false,
        message: 'There was problem when create User',
        error : err
      })
    }else {
      res.json({
        success: true,
        user: added_user,
        token: token.get(added_user)
      })
    }
  })
}

