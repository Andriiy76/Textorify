// backend/index.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000; //  ПРОВЕРЬ ЭТО!

//  Настройки CORS (с явным указанием origin)
const corsOptions = {
    origin: 'https://orange-engine-jj7g57j94xqw3j6gr-3000.app.github.dev', // URL фронтенда
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.options('*', (req, res) => {
  res.status(204).send()
});

app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Express server!');
});

app.listen(port, () => {  //  И  ЭТО!
  console.log(`Server is running on port ${port}`);
});