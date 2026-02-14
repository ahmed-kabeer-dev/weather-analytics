import express from 'express';
import { getWeatherData, getCacheDebug } from '../controllers/weatherController.js';

const router = express.Router();

// Main endpoint - returns all cities with comfort scores
router.get('/', getWeatherData);

// Debug endpoint - shows cache HIT/MISS status
router.get('/cache-status', getCacheDebug);

export default router;