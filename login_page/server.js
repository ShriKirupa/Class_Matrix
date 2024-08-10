const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./User');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/userdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Signup Route
app.post('/api/signup', async (req, res) => {
  const { email, password, userType } = req.body;
  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, role: userType });
    await user.save();
    res.status(200).send('User saved successfully');
  } catch (error) {
    res.status(500).send('Error saving user');
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }
    
    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    res.status(500).send('Error during login');
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});