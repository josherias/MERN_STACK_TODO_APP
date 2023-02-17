const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

const corsOptions = {
  exposedHeaders: "x-auth-token",
};

app.use(cors(corsOptions));
app.use("/uploads", express.static(__dirname + "/uploads"));

require("./startup/db")();
require("./startup/routes")(app);

dotenv.config();

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log("Server is running on http://localhost:" + port)
);
