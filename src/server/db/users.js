const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  phoneNumber: { type: Number, require: true },
  email: { type: String, require: true },
  address: { type: String, require: true },
  authentication: {
    password: { type: String, require: true, select: false },
    salt: { type: String, require: false, select: false },
    sessionToken: { type: String, select: false },
  },
});

// Convert the schema into a model
const UserModel = mongoose.model("User", UserSchema);

// Actions
const getUser = () => UserModel.find();
const getUserbyEmail = (email) => UserModel.findOne({ email });
const getUserByName = (firstName) => UserModel.findOne({ firstName });
const getUserBySessionToken = (sessionToken) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });
const getUserById = (id) => UserModel.findById(id);
const createUser = (values) =>
  new UserModel(values).save().then((user) => user.toObject());
const deleteUserbyId = (id) => UserModel.findByIdAndDelete({ _id: id });
const updateUserById = (id, values) => UserModel.findByIdAndUpdate(id, values);

export {
  UserModel,
  getUser,
  getUserbyEmail,
  getUserByName,
  getUserBySessionToken,
  getUserById,
  createUser,
  deleteUserbyId,
  updateUserById,
};
