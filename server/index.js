import config from './config'
import mongoose from 'mongoose'

mongoose.Promise = global.Promise;
mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'))
mongoose.set('debug', true);

require('./services')
