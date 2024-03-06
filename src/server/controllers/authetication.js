const { getUserbyEmail, createUser } = require("../db/users");
const { authentication, random } = require("../helpers/index");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

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
      return res.status(400).send("Faltan cosas en la solicitud.");

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

    const token = jwt.sign({ userId: user._id }, "your_secret_key_here", {
      expiresIn: "1h",
    }); // Cambia 'your_secret_key_here' por tu clave secreta

    const cookieOption = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      path: "/",
    };
    res.cookie("jwt", token, cookieOption);
    res.send({ status: "ok", message: "Usuario loggeado", redirect: "/src/client/pages/allProducts.html" });
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

module.exports = { register, login };
