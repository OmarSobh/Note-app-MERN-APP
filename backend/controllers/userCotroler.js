const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const  generateToken  = require('../utils/genrateTokens');

const authUser = asyncHandler(async (req, res) => {
      const { email, password } = req.body;


      const user = await User.findOne({ email });



      if (user && (await user.matchPassword(password))) {
            res.json({
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                  isAdmin: user.isAdmin,
                  pic: user.pic,
                  token: generateToken(user._id),
            });
      } else {
            console.log('Invalid email or password');
            res.status(401);
            throw new Error('Invalid email or password');
      }
});

const registerUser = asyncHandler(async (req, res) => {
      const { name, email, password, pic } = req.body;

      const userExists = await User.findOne({ email });

      if (userExists) {
            res.status(400); // Change status code to 400 Bad Request
            throw new Error('User already exists');
      }

      const user = await User.create({
            name,
            email,
            password,
            pic,
      });

      if (user) {
            res.status(201).json({
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                  isAdmin: user.isAdmin,
                  pic: user.pic,
                token : generateToken(user._id),
            });
      } else {
            res.status(500); // Change status code to 500 Internal Server Error
            throw new Error('User creation failed');
      }
});



module.exports = { authUser, registerUser };
