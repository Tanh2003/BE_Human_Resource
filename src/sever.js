import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouters from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";
const morgan = require("morgan");
const helmet = require("helmet");
require('dotenv').config();

let app = express();

// Cấu hình cors cho phép tất cả các địa chỉ IP, nhưng không sử dụng dấu '*' cho credentials
const corsOptions = {
  origin: (origin, callback) => {
    callback(null, origin);  // Cho phép tất cả các nguồn gốc
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,  // Cho phép gửi credentials (cookie, authentication headers)
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));  // Sử dụng cors với các options đã cấu hình

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(helmet());
app.use(morgan("common"));

viewEngine(app);
initWebRouters(app);
connectDB();

let port = process.env.PORT || 6969;
app.listen(port, () => {
  console.log("Backend Nodejs is running on the port: " + port);
});
