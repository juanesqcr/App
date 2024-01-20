const express = require("express");
const { getUsers, getUserbyEmail, createUser } = require("../db/users");
const { authentication, random } = require('../helpers/index')

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

    if (existingUser) {
      return res.sendStatus(400);
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

module.exports = { getAllUsers, register };
