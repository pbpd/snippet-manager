const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://snippetmanager.netlify.app'],
    credentials: true,
  })
);
app.use(cookieParser());

// routers
app.use('/snippet', require('./routers/snippetRouter'));
app.use('/auth', require('./routers/userRouter'));

// mongodb
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log('Connected to MongoDB');
  }
);

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
