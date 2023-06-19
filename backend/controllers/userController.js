const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsyncError");
// const AppError = require('../utils/appError');

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

const saveSearch = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  let searches = user.savedSearches;
  if (searches) {
    searches.push(req.body);
  } else {
    searches = [req.body];
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { savedSearches: searches },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  saveSearch,
};
