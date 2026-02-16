# Weather Analytics Application

A full-stack weather analytics app built with React, Node.js, and Express,
styled with Tailwind CSS and bundled with Vite. Displays real-time weather
data with a custom Comfort Index Score and Auth0 authentication.

## Live Demo
🌐 https://weather-analytics-app-seven.vercel.app

### Test Credentials
```
Email:    careers@fidenz.com
Password: Pass#fidenz
```
MFA: Click **"Try another method"** on the MFA screen to use email verification.

> **Note:** The backend is hosted on Render's free tier. If the app takes
> 30–60 seconds to load on first visit, the server is waking up from sleep.
> Please wait and it will load normally after that.

---

## Tech Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Authentication: Auth0
- Caching: node-cache (in-memory)
- Weather Data: OpenWeatherMap API
- Charts: Recharts

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/weather-analytics.git
cd weather-analytics
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create `server/.env`:
```
PORT=5000
OPENWEATHER_API_KEY=7532b61596df970b30c4c1bba844b227
AUTH0_DOMAIN=dev-3su6c4uxhuwj4ypb.us.auth0.com
```
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
```

Create `client/.env`:
```
VITE_AUTH0_DOMAIN=dev-3su6c4uxhuwj4ypb.us.auth0.com
VITE_AUTH0_CLIENT_ID=VM6IoaerlP91Bqb2DduDEFL5F2JhBhBO
```
```bash
npm run dev
```

### 4. Visit `http://localhost:5173`

---

## Comfort Index Formula

The Comfort Index Score (0–100) measures how comfortable a city's current
weather conditions are for being outdoors. It is calculated on the backend
using four weather parameters.

| Parameter   | Weight | Ideal Range  |
|-------------|--------|--------------|
| Temperature | 40%    | 18°C – 24°C  |
| Humidity    | 30%    | 30% – 60%    |
| Wind Speed  | 20%    | 0 – 5 m/s    |
| Cloudiness  | 10%    | 20% – 50%    |
```
Final Score = (TempScore × 0.40) + (HumidityScore × 0.30) +
              (WindScore × 0.20) + (CloudScore × 0.10)
```

### Why These Parameters?
I chose these four because they are the most directly felt when standing
outdoors. Temperature and humidity together determine how the air feels.
Wind either relieves or worsens that feeling. Cloud cover affects sun
exposure. Each parameter is scored 0–100 based on how close it is to
the ideal range, then multiplied by its weight.

### Why These Weights?
- **Temperature (40%)** is the most noticeable factor in outdoor comfort
- **Humidity (30%)** amplifies temperature — high humidity makes heat
  unbearable and cold feel worse
- **Wind Speed (20%)** has a meaningful but secondary effect — gentle
  breeze is pleasant, strong wind is not
- **Cloudiness (10%)** has the least direct impact on overall comfort

---

## Cache Design

- Each city's weather data is cached individually for **5 minutes**
- First request fetches from OpenWeatherMap API → **MISS**
- Subsequent requests within 5 minutes use saved data → **HIT**
- HIT/MISS status is visible on each city card in the dashboard
- Debug endpoint: `GET /api/weather/cache-status`

---

## Trade-offs Considered

- **node-cache over Redis** — simpler with no extra infrastructure needed.
  Redis would be better for multi-server deployments but is unnecessary
  at this scale.

- **Per-city caching** — each city is cached separately so partial cache
  hits are possible. If 10 of 12 cities are cached, only 2 API calls
  are made instead of 12.

- **ID Token over Access Token** — Auth0's free plan does not support
  custom API audiences for Access Tokens so the ID token is used to
  verify authentication on the backend instead.

---

## Known Limitations

- Cache resets on server restart since it is stored in memory
- OpenWeatherMap free tier is limited to 60 API calls per minute
- Email MFA as a standalone factor requires a paid Auth0 plan. Both
  OTP and Email factors are enabled — users can select email verification
  by clicking "Try another method" on the MFA screen
- Backend hosted on Render free tier spins down after inactivity
- Cities must be manually added to `cities.json`

---

## Authentication

- Public signups are disabled — only manually created users can log in
- Whitelist restriction via Auth0 Post-Login Action blocks unauthorized emails
- MFA is enforced on every login
- Google social login is disabled
- All API routes are protected and return 401 for unauthenticated requests

---

## Bonus Features

- **Dark Mode** — toggle between light and dark themes, saved to localStorage
- **Sorting** — sort cities by comfort score or temperature
- **Filtering** — filter cities by comfort level (comfortable, moderate,
  uncomfortable)
- **Temperature Chart** — bar chart showing current temperature per city,
  color coded by temperature range