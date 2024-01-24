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

const register = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email, address, password } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !email ||
      !address ||
      !password
    ) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserbyEmail(email);
    //TODO: hacer que el correo sea unico

    if (existingUser) {
      return res.sendStatus(406);
    }

    const salt = random();
    const user = await createUser({
      firstName,
      lastName,
      phoneNumber,
      email,
      address,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user).end();
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

//TODO: UPDATE USERS
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

module.exports = { getAllUsers, register, deleteUser, updateUser };
