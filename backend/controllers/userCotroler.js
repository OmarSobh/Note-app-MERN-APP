const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/genrateTokens");

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
    console.log("Invalid email or password");
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400); // Change status code to 400 Bad Request
    throw new Error("User already exists");
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
      token: generateToken(user._id),
    });
  } else {
    res.status(500); // Change status code to 500 Internal Server Error
    throw new Error("User creation failed");
  }
});

// *******
const createDefaultAdminIfNotExists = async () => {
  const defaultAdminEmail = "admin@gmail.com";

  try {
    // Check if the default admin already exists in the database
    const existingAdmin = await User.findOne({ email: defaultAdminEmail });

    if (!existingAdmin) {
      // If the default admin doesn't exist, create a new one
      const defaultAdmin = await User.create({
        name: "Admin", // Set the default admin name
        email: defaultAdminEmail,
        password: "admin123", // Set the default admin password (you should use a more secure method to set the password)
        isAdmin: true, // Set isAdmin to true to mark the user as an admin
        pic: "default-admin-pic.jpg", // Set the default admin profile picture if needed
      });

      console.log("Default admin created:", defaultAdmin);
    } else {
      console.log("Default admin already exists:", existingAdmin);
    }
  } catch (error) {
    console.error("Error creating default admin:", error.message);
  }
};

const generateMultipleUsers = async (count) => {
  try {
    for (let i = 1; i <= count; i++) {
      const userEmail = `user${i}@example.com`;
      const userExists = await User.findOne({ email: userEmail });

      if (!userExists) {
        await User.create({
          name: `User ${i}`,
          email: userEmail,
          password: `user${i}password`, // Set a unique password for each user (you should use a more secure method)
          pic: `user${i}-pic.jpg`, // Set a profile picture for each user if needed
        });
      }
    }

    console.log(`${count} users generated successfully.`);
  } catch (error) {
    console.error("Error generating users:", error.message);
  }
};

// ******

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

module.exports = {
  authUser,
  registerUser,
  updateUserProfile,
  createDefaultAdminIfNotExists,
  generateMultipleUsers,
};
