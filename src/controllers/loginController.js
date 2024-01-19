const users = require('../models/user');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Fetch user by email
    const user = await users.getByEmail(email, req);

    // Check if the user exists and if the provided password is correct
    if (user && user.password === password) {
      // Here, you might want to set a session or token for authentication
      // For example, if using express-session:
      // req.session.user_id = user.user_id;

      // Redirect to the dashboard or send a success response
      return res.redirect('/dashboard');
    } else {
      // If the user doesn't exist or the password is incorrect,
      // redirect back to the login page
      return res.redirect('/admin-login');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  login
};
