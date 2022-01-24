const express = require('express');
const app = express()
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
app.use(cors());

//conect to mongo db
mongoose.connect(
    process.env.ATLAS_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {console.log("connected to mongodb");}
);

const postRoute = require('./routes/posts');
app.use('/posts', postRoute);


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});