const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

require('./config/firebase'); // init Firebase Admin

app.use(express.json());
app.get('/', (req, res) => {
    res.send('DIGISCHOOL API is running 🚀');
  });
  
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/data', require('./routes/dataRoutes'));

app.listen(3000, () => console.log('API running on http://localhost:3000'));
