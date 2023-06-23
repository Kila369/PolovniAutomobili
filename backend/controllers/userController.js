const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsyncError");
const AppError = require("../utils/appError");
const bcrypt = require('bcryptjs');

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

  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'User not found',
    });
  }

  try {
    const search = {
      carName: req.body.carName,
      carImage: req.body.carImage,
      carPrice: req.body.carPrice,
    };

    user.savedSearches.push(search);
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $push: { savedSearches: search } },
      { new: true }
    );

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
        savedSearch: search,
      },
    });
  } catch (error) {
    next(error);
  }
});


const getUser = catchAsync(async (req, res, next) => {
  if (!(req.user.role === "admin") && !(req.user.id === req.params.id)) {
    return next(
      new AppError("You do not have permission to perform this action!", 403)
    );
  }
  const user = await User.findById(req.params.id);

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
  
  const hashedPassword = await bcrypt.hash(password, 12);

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      savedSearches: req.body.savedSearches,
      password : hashedPassword }, 
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
