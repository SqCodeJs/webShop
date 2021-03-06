require("dotenv").config();
const { isUserInDB } = require("../services/isUserInDB");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.postLogin = async (request, response) => {
  try {
    const { mail, password } = request.body;

    const user = await isUserInDB(mail);

    if (user === null) {
      return response.status(404).json({
        message: "user does not exist",
      });
    }

    bcrypt.compare(password, user.pass, (err, result) => {
      if (err) {
        return response.json({ message: err });
      }
      const payload = {
        id: user.id,
        name: user.name,
        mail: user.mail,
      };
      const accessToken = jwt.sign(payload, process.env.SESSIONS_SECRET, {
        expiresIn: "1h",
      });
      if (result) {
        const userState = {
          id: user.id,
          name: user.name,
          mail: user.mail,
          access_token: `Bearer ${accessToken}`,
        };
        return response.status(200).json({ ...userState });
      } else response.status(400).json({ message: "wrong password" });
    });
  } catch (err) {
    return response.status(500).json({
      err,

      message: "cos poszlo nie tak w metodzie post endpoit'u /login",
    });
  }
};
