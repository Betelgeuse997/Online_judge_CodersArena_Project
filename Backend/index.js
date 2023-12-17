require('dotenv').config();
const express = require("express");
const questionRoutes = require("./routes/questions");
const cors = require("cors");
const userRoutes = require("./routes/auth");
const codeRoutes = require("./routes/code");
const submissionRoutes = require("./routes/submissions");
// const {PORT} = require("./config.js");
// import {PORT} from "./config.js";
//import db from "./database/db.js";

// const path = require('path');

const app = express();
const corsOptions = require('./config/corsOptions');


// const buildPath = path.resolve(__dirname, '../frontend/build');

// app.use(express.static(buildPath));

// app.get('/*', function (req, res) {
//   res.sendFile(
//     path.resolve(__dirname, '../frontend/build/index.html'),
//     function (err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     }
//   );
// });

const PORT = 5000;

const mongoose = require('mongoose');

async function connectWithRetry() {
  let retries = 5;
  while (retries) {
    try {
      await mongoose.connect('mongodb://my-mongo-container:27017/ojdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      // await mongoose.connect('mongodb://127.0.0.1:27017/ojdb');
      console.log("Successfully connected to MongoDB");
      break;
    } catch (error) {
      console.error("Error connecting to MongoDB:", error.message);
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      // Wait for a moment before retrying
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

connectWithRetry().then(() => {
  app.use(cors(corsOptions));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use("/", questionRoutes);
  app.use("/", codeRoutes);
  app.use("/", submissionRoutes);
  app.use("/", userRoutes);

  app.listen(process.env.PORT, () => {
    console.log(`Listening to port: ${process.env.PORT}`);
  });
});