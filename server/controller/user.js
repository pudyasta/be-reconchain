const db = require("../services/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findOne } = require("../services/helper");

exports.getDistributorRequest = async (req, res) => {
  const user = res.data;
  try {
    const allAccounts = await db.query(
      `SELECT * FROM users WHERE company_code="${user.company_code}" AND is_active=0`
    );
    res.status(200).json({
      code: 200,
      data: allAccounts,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
  }
};

exports.getDistributorList = async (req, res, next) => {
  const user = res.data;
  try {
    const allAccounts = await db.query(
      `SELECT * FROM users WHERE company_code="${user.company_code}" AND is_active=1 AND role="distributor"`
    );
    res.status(200).json({
      code: 200,
      data: allAccounts,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await findOne(username);
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
            {
              username,
              password,
              company_code: user.data.company_code,
              role: user.data.role,
              email: user.data.email,
            },
            "ppp"
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

  const user = await findOne(username);
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
        const companyCode = (Math.random() + 1).toString(15).substring(2, 8);
        const success = await db.query(
          `INSERT INTO users(name,username,email,role,company,company_code,location,password,longitude,latitude,profile_pict,is_active) VALUE ("${name}","${username}","${email}","${role}","${req.body.company}","${companyCode}","${location}","${hashed}","${longitude}","${latitude}","${profile_pict}","${status}")`
        );
        if (success) {
          const token = jwt.sign(
            { username, password, company_code, role, email },
            "ppp"
          );
          return res.status(200).json({
            code: 200,
            message: "Account has been created successfully",
            user: {
              ...userx,
              company: req.body.company,
              company_code: companyCode,
            },
            token,
          });
        }
      } else {
        if (req.body.company_code) {
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
        } else {
          return res.status(806).json({
            message: "Invalid format",
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
  const { name, password, email, profile_pict } = req.body;
  const user = res.data;
  let hashed;
  if (password) {
    hashed = bcrypt.hashSync(password, 10);
  }
  try {
    const query = `UPDATE users SET name="${
      name ? name : user.name
    }",password="${password ? hashed : user.password}", email="${
      email ? email : user.email
    }",profile_pict="${
      profile_pict ? profile_pict : user.profile_pict
    }" WHERE username="${user.username}"`;
    const success = await db.query(query);
    if (success) {
      return res.status(200).json({
        data: success,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

exports.confirmAccount = async (req, res, next) => {
  try {
    const acc = await db.query(
      `SELECT company_code,is_active FROM users WHERE id=${req.params.id} `
    );
    if (acc.length > 0) {
      if (acc[0].company_code == res.data.company_code) {
        const success = await db.query(
          `UPDATE users SET is_active=${1} WHERE id=${req.params.id}`
        );

        if (success) {
          return res.status(200).json({
            message: "Distributor confirmed",
          });
        }
      } else {
        return res.status(801).json({
          message: "Account not found",
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
