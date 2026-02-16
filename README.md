# Weather Analytics Application

A full-stack weather analytics app built with React, Node.js, and Express, styled with Tailwind CSS and bundled with Vite.Displays real-time weather data with a custom Comfort Index Score,Auth0 authentication, and server-side caching.

---

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **Authentication:** Auth0
- **Caching:** node-cache (in-memory)
- **Weather Data:** OpenWeatherMap API

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/ahmed-kabeer-dev/weather-analytics.git
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
OPENWEATHER_API_KEY=your_openweathermap_api_key
AUTH0_DOMAIN=your-tenant.us.auth0.com
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
VITE_AUTH0_DOMAIN=your-tenant.us.auth0.com
VITE_AUTH0_CLIENT_ID=your_auth0_client_id
```
```bash
npm run dev
```

### 4. Auth0 Configuration

In your Auth0 dashboard under Application Settings, add:
- **Allowed Callback URLs:** `http://localhost:5173`
- **Allowed Logout URLs:** `http://localhost:5173`
- **Allowed Web Origins:** `http://localhost:5173`

### 5. Visit `http://localhost:5173`

---

## Comfort Index Formula

The Comfort Index Score (0–100) measures how comfortable a city's 
current weather is for being outdoors. It is calculated on the 
backend using four parameters.

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

I chose these four because they are the most directly felt by a 
person standing outdoors. Temperature and humidity together determine 
how the air feels on the skin. Wind either relieves or worsens that 
feeling. Cloud cover affects sun exposure and brightness. Each 
parameter is scored 0–100 based on how close it is to the ideal 
range, then multiplied by its weight.

### Why These Weights?

- **Temperature (40%)** is the most noticeable factor in outdoor 
  comfort and gets the highest weight.
- **Humidity (30%)** amplifies temperature — high humidity makes 
  heat unbearable and cold feel worse.
- **Wind Speed (20%)** has a meaningful but secondary effect — 
  gentle breeze is pleasant, strong wind is not.
- **Cloudiness (10%)** has the least direct impact — partial cloud 
  cover is pleasant but it rarely makes or breaks comfort.

---

## Cache Design

- Each city's weather data is cached individually for **5 minutes**
- First request fetches from OpenWeatherMap API → **MISS**
- Subsequent requests within 5 minutes use saved data → **HIT**
- HIT/MISS status is visible on each city card in the UI
- Debug endpoint: `GET /api/weather/cache-status`

---

## Trade-offs Considered

- **node-cache over Redis** — node-cache is simpler and requires no 
  extra infrastructure. Redis would be better for multi-server 
  deployments but is unnecessary at this scale.

- **Per-city caching** — caching each city separately allows partial 
  cache hits. If 10 of 12 cities are cached, only 2 API calls are made.

- **ID Token over Access Token** — Auth0's free plan does not support 
  custom API audiences for Access Tokens, so the ID token is used to 
  verify authentication on the backend.

---

## Known Limitations

- Cache resets on server restart (not persistent)
- OpenWeatherMap free tier is limited to 60 API calls per minute
- Email MFA as a standalone factor requires a paid Auth0 plan. Both 
  OTP and Email factors are enabled — users can select email 
  verification by clicking "Try another method" on the MFA screen
- Cities must be manually added to `cities.json`

---

## Authentication

- Only whitelisted users can log in — public signups are disabled
- MFA is enforced on every login
- All API routes are protected and return 401 for unauthenticated requests

### Test Credentials
```
Email:    careers@fidenz.com
Password: Pass#fidenz
```

MFA: Scan QR code with Google Authenticator, or click 
"Try another method" to receive a code via email.

---

## Bonus Features

- Dark mode with localStorage persistence
- Sort cities by comfort score or temperature
- Filter cities by comfort level
- Temperature bar chart with color coding