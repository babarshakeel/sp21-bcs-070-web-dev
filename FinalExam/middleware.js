const ValidateeUser = (req, res, next) => {
    const { username , password} = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "Please enetr all fields.",
      });
    }
    next();
  };
  
  module.exports = ValidateeUser;