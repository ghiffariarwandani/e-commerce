function errHandler(err, req, res, next) {
  let status = null
  let message = {}
  console.log(err);
  if (err.code === 404) {
      status = 404
      message.err = 'Data Not Found'
  }
  else if (err.name =='ValidationError' || err.name == 'MongoError') {
    status = 400
    message.err = err.message.split('failed: ')[1]
  }
  else if (typeof err == "string") {
    status = 400
    message.err = err
  }
  else if (err.status == 400){
    status = 400
    message.err = err.message
  }
  else{
      status = 500
      message.err = `Internal server error`
  }
  res.status(status).json(message)
}

module.exports = errHandler