const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const cors = require('cors');

connectDB()

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended:false }));
app.use('/api/exercises', require('./routes/exercisesRotes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/completed', require('./routes/exercisesCompleted'));
app.use('/api/programs', require('./routes/programRoutes'));
app.use(errorHandler);

app.listen(port, () => console.log(`server running on port ${port}`));