const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const sequalize = require('./db/dbConnection');

const multer = require('multer');
const upload = multer();

const usersRouter = require('./routes/users');
const jobsRouter = require('./routes/jobs');

const app = express();

// Relations
const User = require('./models/User');
const Job = require('./models/Job');
const Interview = require('./models/Interview');

// User has Many jobs 
User.hasMany(Job, { onDelete: 'CASCADE' })
Job.belongsTo(User)

// Jobs has many interviews
Job.hasMany(Interview, {onDelete: "CASCADE"})
Interview.belongsTo(Job)



const sync = async () => await sequalize.sync({alter:true})
sync()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(upload.array())
app.use(cors())

// routes 
app.use('/users', usersRouter);
app.use('/jobs', jobsRouter)

app.listen(3000, () => {
  console.log('server started on http://localhost:3000/')
})

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });


module.exports = app;
