const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsyncError");
const AppError = require("../utils/appError");

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
  const user = await User.findById(req.user.id);
  let searches = user.savedSearches;
  if (searches) {
    searches.push(req.body);
  } else {
    searches = [req.body];
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
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

<<<<<<< HEAD
const getUser = catchAsync(async (req, res, next) => {
  if (!(req.user.role === "admin") && !(req.user.id === req.params.id)) {
    return next(
      new AppError("You do not have permission to perform this action!", 403)
    );
  }
  const user = await User.findById(req.params.id);
=======
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
const updateUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { name, email, password },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
>>>>>>> 936ee552b2b5254ef47a8eaa1d3d30979e3bfcf2

  res.status(200).json({
    status: "success",
    data: {
      user: user,
    },
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  if (!(req.user.role === "admin") && !(req.user.id === req.params.id)) {
    return next(
      new AppError("You do not have permission to perform this action!", 403)
    );
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      savedSearches: req.body.savedSearches,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  if (!(req.user.role === "admin") && !(req.user.id === req.params.id)) {
    return next(
      new AppError("You do not have permission to perform this action!", 403)
    );
  }
  await User.findByIdAndDelete(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      savedSearches: req.body.savedSearches,
    },
    {
      new: true,
    }
  );

  res.status(204).json({
    status: "success",
    data: {
      user: null,
    },
  });
});

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  saveSearch,
};
