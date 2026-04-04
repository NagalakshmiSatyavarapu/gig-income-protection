import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [plan, setPlan] = useState("");
  const [weather, setWeather] = useState({});
  const [message, setMessage] = useState("");

  // 📍 Auto Location + Weather
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
      )
        .then((res) => res.json())
        .then((data) => setWeather(data.current_weather));
    });
  }, []);

  const register = async () => {
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  const selectPlan = async (p) => {
    setPlan(p);
    const res = await fetch("http://localhost:5000/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: p }),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  const checkClaim = async () => {
    const res = await fetch("http://localhost:5000/check-claim");
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div style={{ fontFamily: "Arial", background: "#f1f3f6" }}>
      
      {/* 🔷 NAVBAR */}
      <div style={navbar}>
        <h2 style={{ color: "white" }}>🚀 Gig Protect</h2>
      </div>

      {/* 🔶 MAIN CONTAINER */}
      <div style={container}>

        {/* REGISTER CARD */}
        <div style={card}>
          <h3>👤 Register</h3>
          <input
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={input}
          />
          <button onClick={register} style={btn}>Register</button>
        </div>

        {/* PLAN CARD */}
        <div style={card}>
          <h3>💰 Choose Plan</h3>
          <button onClick={() => selectPlan("Basic")} style={btn}>Basic ₹20</button>
          <button onClick={() => selectPlan("Standard")} style={btn}>Standard ₹40</button>
          <button onClick={() => selectPlan("Premium")} style={btn}>Premium ₹60</button>
          <p><b>Selected:</b> {plan}</p>
        </div>

        {/* WEATHER CARD */}
        <div style={card}>
          <h3>🌦 Weather</h3>
          <p>🌡 Temp: {weather?.temperature}°C</p>
          <p>💨 Wind: {weather?.windspeed}</p>
        </div>

        {/* CLAIM CARD */}
        <div style={card}>
          <h3>⚡ Claim</h3>
          <button onClick={checkClaim} style={btnGreen}>
            Check Claim
          </button>
        </div>

        {/* STATUS CARD */}
        <div style={card}>
          <h3>📢 Status</h3>
          <p>{message}</p>
        </div>

      </div>
    </div>
  );
}

export default App;

//// 🎨 STYLES

const navbar = {
  background: "#2874f0",
  padding: "15px",
  textAlign: "center",
  boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
};

const container = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  padding: "20px"
};

const card = {
  background: "white",
  padding: "20px",
  margin: "15px",
  width: "250px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  textAlign: "center"
};

const btn = {
  margin: "5px",
  padding: "8px 12px",
  border: "none",
  background: "#2874f0",
  color: "white",
  borderRadius: "5px",
  cursor: "pointer"
};

const btnGreen = {
  ...btn,
  background: "green"
};

const input = {
  padding: "8px",
  margin: "10px",
  width: "80%"
};