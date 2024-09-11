const jwt = require("jsonwebtoken");
const secret = "123$#%";

function createToken(req, res, next) {
  const { name, password } = req.body;

  try {
      const token = jwt.sign({ name, password }, secret);
      console.log(token);
      res.locals.accessToken = token; 
      next();
  } catch (error) {
      next(error); 
  }
}

async function auth(req, res, next) {
  try {
      const token = req.headers["authorization"];
      
      if (!token) {
          return res.status(401).json({ message: "Token is required" });
      }
      
      const decoded = jwt.verify(token, secret);
      console.log(decoded);
      
      req.user = decoded; 
      next();
  } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Unauthorized" });
  }
}


module.exports = { createToken, auth };