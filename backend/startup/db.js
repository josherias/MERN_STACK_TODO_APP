const mongoose = require("mongoose");
const dotenv = require("dotenv");
mongoose.set("strictQuery", false);

dotenv.config();

module.exports = function () {
  mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(() => console.log("Connected to database...."))
    .catch((err) => console.log(err));
};
