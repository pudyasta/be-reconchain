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
  const rows = await db.query(`SELECT * FROM users WHERE username="${req}"`);
  return {
    data: {
      username: rows[0]?.username,
      password: rows[0]?.password,
      email: rows[0]?.email,
      role: rows[0]?.role,
      company: rows[0]?.company,
      location: rows[0]?.location,
      profile_pict: rows[0]?.profile_pict,
    },
  };
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await this.findOne(username);
  if (!user.data.username) {
    return res
      .status(403)
      .json({ error: "Your account is not registered yet", code: 403 });
  } else {
    try {
      const hashed = bcrypt.compareSync(password, user.data.password);
      if (hashed) {
        const token = jwt.sign({ user }, "ppp", { expiresIn: "2d" });
        return res.json({
          user: user.data,
          token,
        });
      } else {
        return res.status(403).json({ error: "Invalid Account" });
      }
    } catch (err) {
      return res.status(500).json({ err: err });
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
    profile_pict,
  } = req.body;
  const user = await this.findOne(username);
  if (user.data.username) {
    return res.status(403).json({ error: "username already taken" });
  } else {
    try {
      const hashed = bcrypt.hashSync(password, 10);
      const success = await db.query(
        `INSERT INTO users(username,email,role,company,location,password,longitude,latitude,profile_pict) VALUE ("${username}","${email}","${role}","${company}","${location}","${hashed}","${longitude}","${latitude}","${profile_pict}")`
      );
      if (success) {
        return res.status(200).json({
          code: 200,
          message: "Account has been created successfully",
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: err,
      });
    }
  }
};

exports.updateUser = async (req, res, next) => {
  const { password, email, company, location, profile_pict } = req.body;
  const { user } = res.data;
  let hashed;
  if (password) {
    hashed = bcrypt.hashSync(password, 10);
  }
  try {
    const query = `UPDATE users SET password="${
      password ? hashed : user.data.password
    }", email="${email ? email : user.data.email}",company="${
      company ? company : user.data.company
    }", location="${location ? location : user.data.location}",profile_pict="${
      profile_pict ? profile_pict : user.data.profile_pict
    }" WHERE username="${user.data.username}"`;
    const success = await db.query(query);
    if (success) {
      return res.json({
        data: success,
      });
    }
  } catch (error) {
    return res.json({
      error,
    });
  }
};
