const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const knexLogger = require('knex-logger');
const db = require('./db');

const indexRouter = require('./routes/index');
const drugRouter = require('./routes/drugs');
const cellRouter = require('./routes/cells');
const comboRouter = require('./routes/combos');
const biomarkerRouter = require('./routes/biomarkers');
const datasetRouter = require('./routes/datasets');
const pharmacogenomicsRouter = require('./routes/pharmacogenomics');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(knexLogger(db));


// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/', indexRouter);
app.use('/api/cell_lines/', cellRouter);
app.use('/api/drugs/', drugRouter);
app.use('/api/combos/', comboRouter);
app.use('/api/biomarkers/', biomarkerRouter);
app.use('/api/datasets/', datasetRouter);
app.use('/api/pharmacogenomics/', pharmacogenomicsRouter);

app.get('/api/*', (req, res) => {
  res.status(400).json({ message: 'Incorrectly specified endpoint' });
});

app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: './client/build' });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});


const port = process.env.PORT || 5000;
app.listen(port);

console.log(`App is listening on port ${port}`);
