const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user_id) {
      next(); 
    } else {
      next(); 
      //res.redirect("/admin-login"); 
    }
  };
  
  module.exports = { isAuthenticated };
  