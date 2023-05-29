module.exports =   function isAdmin(req, res, next) {
    const user = req.user;
  
    if (user && user.isAdmin) {
      next();
    } else {
      res.status(401).json({ message: "No autorizado" });
    }
  }
  
  
