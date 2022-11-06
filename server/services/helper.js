const db = require("./db");

const findOne = async (req) => {
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

module.exports = {
  findOne,
};
