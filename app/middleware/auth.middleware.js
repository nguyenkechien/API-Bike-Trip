const jwt    = require('jsonwebtoken');
const config = require('../../config');

module.exports = (req, res, next) => {
  const _token = req.headers["x-auth-token"] || req.headers["authorization"];
  
  if(!_token){
    return res.status(401).send("Access denied. No token provided.")
  }

  try {
    const decoded  = jwt.verify(_token, config.PRIVATEKEY)
          req.user = decoded;

    next();

  } catch (ex) {
    res.status(400).send('Invalid token.')
  }
}
