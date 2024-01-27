const express = require("express");
const {
  getUsers,
  getUserbyEmail,
  createUser,
  deleteUserbyId,
  getUserById,
} = require("../db/users");
const { authentication, random } = require("../helpers/index");

const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};


const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.sendStatus(400);
    }

    const existingId = await getUserById(id);

    if (!existingId) {
      console.warn("User doesn't exist");
      return res.sendStatus(404).json("User doesn't exist");
    }

    const deleteUser = await deleteUserbyId(id);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id, firstName, lastName, phoneNumber, email, address, password } =
      req.body;

    const existingUser = await getUserById(id);
    if (!existingUser) {
      return res.sendStatus(404);
    }

    existingUser.firstName = firstName;
    existingUser.lastName = lastName;
    existingUser.phoneNumber = phoneNumber;
    existingUser.email = email;
    existingUser.address = address;
    existingUser.password = password;

    existingUser.save();

    return res.status(200).json(existingUser).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

module.exports = { getAllUsers, deleteUser, updateUser };
