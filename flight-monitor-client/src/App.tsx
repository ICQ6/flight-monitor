import React, { useState, useEffect } from "react";
import FlightDisplay from "./flightDisplay";
import "./App.css";

function App() {
  const [altitude, setAltitude] = useState(0);
  const [his, setHis] = useState(0);
  const [adi, setAdi] = useState(0);
  const [mode, setMode] = useState("none"); // "text" | "visual" | "input"

  const fetchData = async () => {
    try {
      const res = await fetch("/api/status");
      const status = await res.json();
      console.log("Server status:", status);

      const resData = await fetch("/api/flight-data/latest");
      const data = await resData.json();

      setAltitude(data.altitude.value);
      setHis(data.his.value);
      setAdi(data.adi.value);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  const handleInputMode = () => {
    setAltitude(0);
    setHis(0);
    setAdi(0);
    setMode("input");
  };

  function isValid() {
    return (
      0 <= altitude &&
      altitude <= 3000 &&
      0 <= his &&
      his <= 360 &&
      -100 <= adi &&
      adi <= 100
    );
  }

  const handleSubmit = async () => {
    try {
      if (isValid()) {
        await fetch("/api/flight-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            altitude,
            his,
            adi,
          }),
        });
        alert("Data submitted");

        setMode("visual");
      } else {
        alert("Data out of bounds");
      }
    } catch (err) {
      console.error("Submit failed", err);
    }
  };

  useEffect(() => {
    if (mode === "text" || mode === "visual") {
      fetchData();
    }
  }, [mode]);

  return (
    <div className="container">
      <div className="header">
        <button className="btn" onClick={() => isValid() && setMode("text")}>
          TEXT
        </button>
        <button className="btn" onClick={() => isValid() && setMode("visual")}>
          VISUAL
        </button>
        <button className="btn" onClick={handleInputMode}>
          +
        </button>
      </div>

      {mode === "input" && (
        <div className="input-box">
          <label>Altitude</label>
          <input
            type="number"
            value={altitude}
            onChange={(e) => setAltitude(Number(e.target.value))}
          />
          <label>HIS</label>
          <input
            type="number"
            value={his}
            onChange={(e) => setHis(Number(e.target.value))}
          />
          <label>ADI</label>
          <input
            type="number"
            value={adi}
            onChange={(e) => setAdi(Number(e.target.value))}
          />
          <button onClick={handleSubmit}>SEND</button>
        </div>
      )}

      {(mode === "visual" || mode === "text") && isValid() && (
        <FlightDisplay altitude={altitude} his={his} adi={adi} mode={mode} />
      )}
    </div>
  );
}

export default App;
