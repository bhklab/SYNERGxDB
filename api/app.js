const express = require('express');
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`App is listening on port ${port}`);
