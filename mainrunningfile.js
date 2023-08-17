const express = require("express");
const cache = require("./cache");
const rateLimiter = require("./ratelimiter");
const { scheduleBackgroundJobs } = require("./backgroundJobs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Placeholder data for coins (for demonstration purposes)
const coinCache = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    marketCap: "1234567890",
    // Other coin data...
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    marketCap: "2345678901",
    // Other coin data...
  },
  // Add more coin objects...
];

app.get("/coins", (req, res) => {
    res.json(coinCache);
});
  
app.get("/coins/price/:coinId", async (req, res) => {
    const coinId = req.params.coinId;
    const coinPrice = cache.get(coinId);
  
    if (coinPrice) {
      res.json({ coinId, price: coinPrice });
    } else {
      res.status(404).json({ message: "Coin price not available in cache." });
    }
});
  
scheduleBackgroundJobs();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
