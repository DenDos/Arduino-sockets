var log  = require("../../utils/log")(module);

module.exports = (err, req, res, next) => {

  log.error(`Web: ${err}`)

  if(err.status){
    res.statusCode = err.status
  }

  if(res.statusCode < 400) {
    res.statusCode = 500
  }

  let accept = req.headers.accept || ''

  if (accept.indexOf('json') != -1) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: err }))
  }else {
    res.setHeader('Content-Type', 'text/plain')
    res.end(err.toString())
  }
}
