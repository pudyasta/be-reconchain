const db = require("../services/db");
const qrcode = require("qrcode");

exports.deployQr = async (req, res, next) => {
  const count = req.body.count;
  let data = [];
  try {
    let queue = "";
    for (let i = 0; i < count; i++) {
      const random = Math.random().toString(36).substring(2, 7);
      const qr = "RCN" + res.data.company_code + random;
      const url = "https://reconchain.vercel.app/track/" + qr;
      const a = await qrcode.toDataURL(qr);
      data.push({ url, image: a });
      i == count - 1
        ? (queue += `('${url}','available','${res.data.username}','${a}')`)
        : (queue += `('${url}','available','${res.data.username}','${a}'),`);
    }

    const query = `INSERT INTO qrcode(qrcode_id,status,username,image_url) VALUES${queue}`;
    const success = await db.query(query);
    if (success) {
      return res.status(200).json({
        message: "QR created successfully",
        data: data,
      });
    }
  } catch (error) {
    console.log("first");
  }
};
