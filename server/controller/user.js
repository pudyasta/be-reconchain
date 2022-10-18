const db = require("../services/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getMultiple = async (req, res) => {
  const rows = await db.query(`SELECT * FROM products`);
  const data = rows;
  return {
    data,
  };
};

exports.findOne = async (req, res) => {
  const rows = await db.query(
    `SELECT username, password FROM users WHERE username="${req}" `
  );
  return {
    username: rows[0]?.username,
    password: rows[0]?.password,
  };
};

exports.login = async (req, res) => {
  const { username, password } = req;
  const user = await this.findOne(username);
  if (!user.username) {
    return { error: "Your account is not registered yet", code: 403 };
  } else {
    try {
      const hashed = bcrypt.compareSync(password, user.password);
      if (hashed) {
        const token = jwt.sign({ user }, "ppp", { expiresIn: "2d" });
        return {
          username,
          token,
        };
      } else {
        return { error: "Password do not match" };
      }
    } catch (err) {
      return { err };
    }
  }
};

exports.register = async (req, res) => {
  const {
    username,
    password,
    email,
    role,
    company,
    location,
    longitude,
    latitude,
  } = req;
  const user = await this.findOne(username);

  if (user.username) {
    return { error: "username already taken" };
  } else {
    try {
      const hashed = bcrypt.hashSync(password, 10);
      const success = await db.query(
        `INSERT INTO users(username,email,role,company,location,password,longitude,latitude) VALUE ("${username}","${email}","${role}","${company}","${location}","${hashed}","${longitude}","${latitude}")`
      );
      if (success) {
        return {
          code: 200,
          message: "Account has been created successfully",
        };
      }
    } catch (err) {
      return res.status(500).json({
        error: err,
      });
    }
  }
};
