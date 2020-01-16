const jwt    = require('jsonwebtoken');
const config = require('../../config');

module.exports = async (req, res, next) => {
  const _token = await req.headers["x-auth-token"] || req.headers["authorization"];
  try {
    if (!_token) {
      return res.status(401).send("Access denied. No token provided.")
    }
    const decoded = jwt.verify(_token, config.PRIVATEKEY);
    req.user = decoded;
    next();
  } catch (ex) {
    console.log(ex)
    res.status(401).send('Invalid token.')
  }
}
