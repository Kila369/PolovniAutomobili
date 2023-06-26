const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsyncError");
const AppError = require("../utils/appError");
const bcrypt = require("bcryptjs");
const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(
      null,
      `vehicle-${req.body.name}-${Date.now()}-${file.originalname}.${ext}`
    );
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not a image, please upload only images!", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const setImageDestination = (files) => {
  if (files) {
    return files.map((file) => `${file.destination}/${file.filename}`);
  } else {
    return undefined;
  }
};

const uploadUserPhoto = upload.single("photo");

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
      status: "fail",
      message: "User not found",
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
      status: "success",
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
  const { name, email, savedSearches, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      name,
      email,
      savedSearches,
      password: hashedPassword,
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
