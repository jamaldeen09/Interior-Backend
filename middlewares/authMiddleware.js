const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.token;

  if (!token) return res.status(403).json("Access Denied");
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json("Token is not valid");
    req.user = user;
    next();
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not authorized");
    }
  });
};

module.exports = { verifyToken, verifyAdmin };