
const express = require("express");
const validaxis = require("validaxis");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/api/validate", (req, res) => {
  const { type, value } = req.query;

  if (typeof value !== "string") {
    return res.status(400).json({ error: "Value is required" });
  }

  try {
    switch (type) {
      case "mobile":
        return res.json({ valid: validaxis.isValidMobile(value) });
      case "pincode":
        return res.json({ valid: validaxis.isValidPincode(value) });
      case "pan":
        return res.json({ valid: validaxis.isValidPAN(value) });
      case "inr":
        return res.json({ formatted: validaxis.formatINR(Number(value)) });
      default:
        return res.status(400).json({ error: "Invalid type" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`ValidAxis demo running on port ${PORT}`);
});
