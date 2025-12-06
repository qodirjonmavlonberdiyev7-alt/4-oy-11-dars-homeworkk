const { read_file, write_file } = require("../fs/file-manager");
const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const { sendMessage } = require("../utils/email-sender");
const tokenGenerator = require("../utils/token-generator");

//register

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "usernmae, email and password are required!",
      });
    }

    const data = read_file("user.json");

    const foundedEmail = data.find((item) => item.email === email);
    if (foundedEmail) {
      return res.status(401).json({
        message: "Email already exists",
      });
    }

    const foundedUsername = data.find((item) => item.username === username);
    if (foundedUsername) {
      return res.status(401).json({
        message: "Username already exists",
      });
    }

    const hash = await bcrypt.hash(password, 12);

    const generatedCode = +Array.from({ length: 6 }, () =>
      Math.ceil(Math.random() * 9)
    ).join("");

    await sendMessage(email, generatedCode);

    data.push({
      id: v4(),
      username,
      email,
      role: "user",
      password: hash,
    });

    write_file("user.json", data);
    res.status(201).json({
      message: "Registered",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "email and password are required!",
      });
    }

    const data = read_file("user.json");

    const foundedUser = data.find((item) => item.email === email);
    if (!foundedUser) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    const decode = await bcrypt.compare(password, foundedUser.password);

    if (decode) {
      const payload = {
        id: foundedUser.id,
        email: foundedUser.email,
        role: foundedUser.role,
      };
      const token = tokenGenerator(payload);

      res.status(200).json({
        message: "Success",
        token
      })
    } else {
      return res.status(401).json({
        message: "Wrong password",
      });
    }

    res.status(201).json({
      message: "Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};
