import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import weatherRoutes from './routes/weatherRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://weather-analytics-app-seven.vercel.app'
  ],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Authorization', 'Content-Type']
}));
app.use(express.json());

// Routes
app.use('/api/weather', weatherRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Auth error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Internal server error'
    });
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});