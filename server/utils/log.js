import moment from 'moment'
import winston from 'winston'

const ENV = process.env.NODE_ENV || 'development'

// can be much more flexible than that O_o
function getLogger(module) {

  let path = module.filename.split('\\').slice(-2).join('\\');

  return new winston.Logger({
    transports: [
      new winston.transports.Console({
        timestamp: ()=> moment().format("DD.MM HH:mm"),
        colorize: true,
        level: (ENV == 'development') ? 'debug' : 'error',
        label: path
      })
    ]
  });
}

module.exports = getLogger;
