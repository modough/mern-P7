const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://" +
      process.env.DB_USER_LOGIN +
      "@cluster0.2b5qw.mongodb.net/mern-p7",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.log("Failed to connect to mongoDB", err));
