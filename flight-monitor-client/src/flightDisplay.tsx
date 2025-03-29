import React from "react";
import "./App.css";

type FlightDisplayProps = {
  altitude: number;
  his: number;
  adi: number;
  mode: "text" | "visual";
};

const FlightDisplay: React.FC<FlightDisplayProps> = ({
  altitude,
  his,
  adi,
  mode,
}) => {
  const topPosition = `${(1 - altitude / 3000) * 200}px`;

  // צבע לפי ADI
  const adiClass = adi === 100 ? "blue" : adi === 0 ? "green" : "white";

  return (
    <div className="flight-container">
      {mode !== "text" && (
        <div className="visual-section">
          {/* Altitude */}
          <div className="altitude-scale">
            <div
              className="altitude-indicator"
              style={{ top: topPosition }}
            ></div>
            {[3000, 2000, 1000, 0].map((val, i) => (
              <div
                key={i}
                className="scale-label"
                style={{ top: `${(1 - val / 3000) * 200}px` }}
              >
                {val}
              </div>
            ))}
          </div>

          {/* HIS */}
          <div className="his-display">
            {/* חץ שלא זז */}
            <div className="arrow">▲</div>

            {/* מעגל שמסתובב */}
            <div
              className="his-circle"
              style={{ transform: `rotate(${his}deg)` }}
            >
              <div
                className="degree-label top"
                style={{ transform: `rotate(${-his}deg)` }}
              >
                0
              </div>
              <div
                className="degree-label right"
                style={{ transform: `rotate(${-his}deg)` }}
              >
                180
              </div>
              <div
                className="degree-label bottom"
                style={{ transform: `rotate(${-his}deg)` }}
              >
                90
              </div>
              <div
                className="degree-label left"
                style={{ transform: `rotate(${-his}deg)` }}
              >
                270
              </div>
            </div>
          </div>

          {/* ADI */}
          <div className="adi-display">
            <div className={`circle ${adiClass}`}></div>
          </div>
        </div>
      )}

      {/* TEXT MODE */}
      {mode === "text" && (
        <div className="data-section">
          <div className="data-box">
            Altitude <br /> {altitude}
          </div>
          <div className="data-box">
            HIS <br /> {his}
          </div>
          <div className="data-box">
            ADI <br /> {adi}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightDisplay;
