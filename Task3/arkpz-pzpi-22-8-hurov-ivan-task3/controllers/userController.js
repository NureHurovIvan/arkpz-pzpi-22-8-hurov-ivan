const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// registration
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'A user with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Create a new user
    const user = new User({
      name,
      email,
      password_hash,
      role: role || 'user',
    });

    await user.save();
    res.status(201).json({ message: 'User successfully registered' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign(
          { user_id: user._id, email: user.email, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
      );

      res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 7200000, // 2h
      });

      res.json({ message: 'Successful login', user: { email: user.email, role: user.role } });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// logout
exports.logoutUser = (req, res) => {
  res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
  });
  res.json({ message: 'You have successfully logged out' });
};

// Delete user
exports.deleteUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    const user = await User.findByIdAndDelete(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
