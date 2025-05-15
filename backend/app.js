const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const notesRoutes = require('./routes/notes');
const usersRoutes = require('./routes/users');

app.use(cors());

mongoose.connect("mongodb://localhost:27017/note")
.then(()=>{
  console.log("Database is successfully connected");
});

const { PORT = 3000 } = process.env;

app.use('/notes', notesRoutes);
app.use('/users', usersRoutes);

app.use((err, req, res, next) => {
   console.log("err:" + err)

  res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT, () => console.log(`O servidor está rodando na porta: ${PORT}`));