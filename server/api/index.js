import express  from 'express'
import passport from 'passport'

import config   from '../config'

import UsersController    from './controllers/usersController'

var router = express.Router();
module.exports = router


router.use('/protected',                     passport.authenticate('jwt', config.get('jwtSession')))

// # Auth
router.post('/authenticate',                 UsersController.authenticate)


router.get('/protected/current_user',              UsersController.current_user)
router.put('/protected/user',                      UsersController.update)
router.get('/protected/user/:id',                  UsersController.get_user)
router.get('/users',                               UsersController.all)
router.post('/user',                               UsersController.add)


router.post('/test',                               UsersController.test)
