const users = require('../models/user');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.getByEmail(email);
    if (user && user.password === password) {
      res.redirect('/dashboard');
    } else {
      res.redirect('/admin-login');
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  login
};
