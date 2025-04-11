const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
// const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const jobRoutes = require('./routes/jobRoutes');
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// Add this before your other routes

app.use(cors({
  origin: ['https://your-frontend-url.vercel.app', 'http://localhost:3000']
}));

app.use(express.json());

app.get('/test', (req, res) => {
  res.json({ message: 'Test route working!' });
});
// Routes
app.use('/api/jobs', jobRoutes);

// Error handling
// app.use(notFound);
// app.use(errorHandler);

// Connect to database and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error(`Database connection error: ${err.message}`);
    process.exit(1);
  });