const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


let user = {};
let selectedPlan = "";
let weather = { temp: 45, rain: 60 };

app.get("/", (req, res) => {
    res.send("Server Running");
});


app.post("/register", (req, res) => {
    user = req.body;
    res.json({ message: "User Registered", user });
});

app.post("/plan", (req, res) => {
    selectedPlan = req.body.plan;
    res.json({ message: "Plan Selected", selectedPlan });
});

app.get("/weather", (req, res) => {
    res.json(weather);
});

app.get("/check-claim", async (req, res) => {
    try {
        const response = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=16.5&longitude=80.6&current_weather=true"
        );
        const data = await response.json();

        const temp = data.current_weather.temperature;

        // simple rain simulation
        const rain = temp > 35 ? 60 : 10;

        if (temp > 30 || rain > 50) {
            res.json({
                message: `🔥 Claim Triggered! Temp: ${temp}°C → Payout Sent 💰`
            });
        } else {
            res.json({
                message: `✅ No Claim. Temp: ${temp}°C`
            });
        }
    } catch (err) {
        res.json({ message: "Error fetching weather" });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});