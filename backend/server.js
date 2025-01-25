require('dotenv').config();
const express = require('express');
const ConnectDB = require('./db/DB');
const cors = require('cors');
const bodyParser = require('body-parser');


// Routes
const authRoutes = require('./routes/authRoutes');
const resetRoutes = require('./routes/resetRoutes');
const contactRoutes = require('./routes/contactRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const homeRoutes = require('./routes/homeRoutes');
const projectRoutes = require('./routes/projectRoutes');
const cvRoutes = require('./routes/cvRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const skillRoutes = require('./routes/skillRoutes');


const app = express();
const PORT = process.env.PORT || 3031;

app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());





// Routes
app.use('/api/auth', authRoutes);
app.use('/api/reset', resetRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/cv', cvRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/skills', skillRoutes);



// Connect DB and start the server
ConnectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("Error during app startup:", err);
});
