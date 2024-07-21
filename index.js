const express = require("express");
const dotenv = require("dotenv");
const Router = require("./routes");
const malformedRequestMiddleware = require("./middlewares/malformed-request");
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3004;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", Router);

app.use(malformedRequestMiddleware);

app.listen(PORT, () => console.log(`Server heard on ${PORT}`));
