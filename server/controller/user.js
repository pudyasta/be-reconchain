const db = require("../services/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.findOne = async (req, res) => {
  const rows = await db.query(`SELECT * FROM users WHERE username="${req}"`);
  return {
    data: {
      name: rows[0]?.name,
      username: rows[0]?.username,
      password: rows[0]?.password,
      email: rows[0]?.email,
      role: rows[0]?.role,
      company: rows[0]?.company,
      company_code: rows[0]?.company_code,
      location: rows[0]?.location,
      longitude: rows[0]?.longitude,
      latitude: rows[0]?.latitude,
      profile_pict: rows[0]?.profile_pict,
      status: rows[0]?.is_active,
    },
  };
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await this.findOne(username);
  if (!user.data.username) {
    return res
      .status(801)
      .json({ error: "Your account is not registered yet", code: 403 });
  } else {
    if (user.data.status == 0) {
      return res
        .status(802)
        .json({ error: "Your account is not verified yet", code: 403 });
    } else {
      try {
        const hashed = bcrypt.compareSync(password, user.data.password);
        if (hashed) {
          const token = jwt.sign(
            { username, password, company_code: user.data.company_code },
            "ppp",
            {
              expiresIn: "2d",
            }
          );
          return res.json({
            user: user.data,
            token,
          });
        } else {
          return res.status(803).json({ error: "Invalid Account" });
        }
      } catch (err) {
        return res.status(500).json({ err: err });
      }
    }
  }
};

exports.register = async (req, res) => {
  const {
    name,
    username,
    password,
    email,
    role,
    company_code,
    location,
    longitude,
    latitude,
    profile_pict,
  } = req.body;

  const user = await this.findOne(username);
  if (user.data.username) {
    return res.status(804).json({ error: "username already taken" });
  } else {
    try {
      const hashed = bcrypt.hashSync(password, 10);
      const status = role == "producer" ? 1 : 0;
      const userx = {
        name,
        username,
        password,
        email,
        role,
        company_code,
        location,
        longitude,
        latitude,
        profile_pict,
        status,
      };

      if (role == "producer") {
        const comp = req.body.company
          .toUpperCase()
          .replace(/\s|[A,I,U,E,O]/g, "")
          .substring(0, 5);
        const companyCode =
          comp + (Math.random() + 1).toString(15).substring(2, 6);
        const success = await db.query(
          `INSERT INTO users(name,username,email,role,company,company_code,location,password,longitude,latitude,profile_pict,is_active) VALUE ("${name}","${username}","${email}","${role}","${req.body.company}","${companyCode}","${location}","${hashed}","${longitude}","${latitude}","${profile_pict}","${status}")`
        );
        if (success) {
          const token = jwt.sign({ username, password, company_code }, "ppp", {
            expiresIn: "2d",
          });
          return res.status(200).json({
            code: 200,
            message: "Account has been created successfully",
            user: { ...userx, company: req.body.company },
            token,
          });
        }
      } else {
        const company = await db.query(
          `SELECT company from users WHERE company_code="${company_code}"`
        );
        if (company[0]?.company) {
          const success = await db.query(
            `INSERT INTO users(name,username,email,role,company,company_code,location,password,longitude,latitude,profile_pict,is_active) VALUE ("${name}","${username}","${email}","${role}","${company[0].company}","${company_code}","${location}","${hashed}","${longitude}","${latitude}","${profile_pict}","${status}")`
          );
          if (success) {
            return res.status(200).json({
              code: 200,
              message: "Account has been created successfully",
              user: { ...userx, company: company[0].company },
            });
          }
        } else {
          return res.status(805).json({
            code: 400,
            message: "Invalid company",
          });
        }
      }
    } catch (err) {
      return res.status(500).json({
        error: err,
      });
    }
  }
};

exports.updateUser = async (req, res, next) => {
  const {
    name,
    password,
    email,
    company,
    location,
    profile_pict,
    longitude,
    latitude,
  } = req.body;
  const { user } = res.data;
  let hashed;
  if (password) {
    hashed = bcrypt.hashSync(password, 10);
  }
  try {
    const query = `UPDATE users SET name="${
      name ? name : user.data.name
    }",password="${password ? hashed : user.data.password}", email="${
      email ? email : user.data.email
    }",company="${company ? company : user.data.company}", location="${
      location ? location : user.data.location
    }",profile_pict="${
      profile_pict ? profile_pict : user.data.profile_pict
    }" WHERE username="${user.data.username}"`;
    const success = await db.query(query);
    if (success) {
      return res.status(200).json({
        data: success,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

exports.confirmAccount = async (req, res, next) => {};
