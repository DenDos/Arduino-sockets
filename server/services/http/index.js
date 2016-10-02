import express        from 'express'
import bodyParser     from 'body-parser'
import methodOverride from 'method-override'
import morgan         from 'morgan'
import favicon        from 'serve-favicon'
import cookieParser   from 'cookie-parser'
import session        from 'express-session'
import staticFiles    from 'st'
import path           from 'path'
import fs             from 'fs'
import mongoose       from 'mongoose'
import passport       from 'passport'
import io                  from 'socket.io'

import config from '../../config'




var MongoStore     = require('connect-mongo')(session)
var app            = express()
var server         = app.listen(process.env.PORT || '3000')



const isDeveloping  = process.env.NODE_ENV !== 'production'
const isProduction  = !isDeveloping
const publicPath    = path.resolve(`${__dirname}/../../../build`)
const uploadsPath   = path.resolve(`${__dirname}/../../../uploads`)


// # Add headers
// app.use((req, res, next) => {
//     // # Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     // # Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
//     // # Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization')
//     // # Set to true if you need the website to include cookies in the requests sent
//     // # to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true)
//     // # Pass to next layer of middleware
//     next()
//   }
// )

app.use(cookieParser('SAJdfnoi2D2'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride('X-HTTP-Method-Override'))

app.use(session({
  secret: config.get('session:secret'),
  cookie: config.get('session:cookie'),
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ url: config.get('mongoose:uri') })
}))


app.use(passport.initialize())

require("../auth")(passport)

var errorLogStream = fs.createWriteStream(__dirname + '/error.log', {flags: 'a'})

app.use(morgan('combined', {
  stream: errorLogStream,
  skip: (req,res) => {
    return res.statusCode < 400
  }
}))

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

app.use("/api", require("../../api"))


// WEBPACK LIVERELOAD STUFF

if (isDeveloping) {
  // UPLOADS
  app.use("/uploads",staticFiles({
    path: uploadsPath,
    passthrough: true,
    cache : false,
    gzip: true
  }));
  
  // WEBPACK
  const webpack              = require('webpack')
  const webpackConfig        = require('../../../webpack.config.js')
  const webpackMiddleware    = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')

  const compiler = webpack(webpackConfig);
  const middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'build',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(publicPath, 'index.html')));
    res.end();
  });
}

//PRODUCTION SERVE STATIC
if (isProduction) {
  app.use(staticFiles({
    path: publicPath,
    passthrough: true,
    cache : false,
    gzip: true,
    index: 'index.html'
  }))

  app.get("*", (req, res)=> {
    res.sendFile(path.join(publicPath, "index.html"))
  })
}

var socket = io.listen(server);
require('../socket')(socket);


app.use(require("./errorHandler"))

module.exports.app = app;
module.exports.server = server;
