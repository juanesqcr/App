const {
  getUserbyEmail,
  createUser,
} = require("../db/users");
const { authentication, random } = require("../helpers/index");

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

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.error("Error in the email or password");
      return res.sendStatus(400);
    }

    const user = await getUserbyEmail(email).select(
      "authentication.salt +authentication.password"
    );

    if (!user) {
      console.log("User doesn't exit");
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password != expectedHash) {
      return res.sendStatus(403);
    }

    //Update User session
    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );
    await user.save();

    res.cookie("USER_AUTH", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

module.exports = { register, login };
