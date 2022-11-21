const express = require('express');
require('express-async-errors');
require('dotenv').config();
const morgan = require('morgan');
const {errorHandler} = require("./middlewares/error");
const {handleNotFound} = require("./utils/helper");
const app = express();
const resenasRouter = require('./routes/reseñas');
const userRouter = require('./routes/user');
const bookRouter = require('./routes/libro');



app.use(express.json());
app.use(morgan("dev"));

app.use('/api/v1/resena', resenasRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/libro', bookRouter);

app.use('/*', handleNotFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log("Listening on port "+PORT);
})