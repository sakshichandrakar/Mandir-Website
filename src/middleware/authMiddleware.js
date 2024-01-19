const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user_id) {
      next(); 
      console.log("sakshi");
    } else {
      res.redirect("/admin-login"); 
    }
  };
  
  module.exports = { isAuthenticated };
  