import express from 'express';
import { getWeatherData, getCacheDebug } from '../controllers/weatherController.js';
import { checkJwt } from '../config/auth0.js';

const router = express.Router();

// Main endpoint - requires valid Auth0 token & returns all cities with comfort scores
router.get('/', checkJwt, getWeatherData);

// Debug endpoint - shows cache HIT/MISS status
router.get('/cache-status', getCacheDebug);

export default router;
