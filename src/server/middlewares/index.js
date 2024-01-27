const { get, merge } = require("lodash");
const {getUserBySessionToken} = require("../db/users");

const isAutheticated = async (req, res, next) => {
  try {
    const sessionToken = req.cookies["USER_AUTH"];
    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const existingUser = getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return res.sendStatus(403);
    }
    merge(req, { identity: existingUser });
    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

//TODO: agregar isOwner

module.exports = { isAutheticated };
