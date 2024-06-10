import { useState } from "react";
import c from "./AbsTloOutput.module.css";
import Output from "./Output";
import Abs from "./Abs";

const AbsTloOutput = (p) => {
  const [today, setToday] = useState(new Date().toISOString().split("T")[0]);
  return (
    <div className={c.container}>
      <div className={c.inputHolder}>
        <div className={c.inputD}>
          <h3>start date:</h3>
          <input
            type="date"
            value={today}
            onChange={(e) => setToday(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            pattern="yyyy-mm-dd"
          />
        </div>
        <div className={c.inputD}>
          <h3>end date:</h3>
          <input
            type="date"
            value={today}
            onChange={(e) => setToday(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            pattern="yyyy-mm-dd"
          />
        </div>
      </div>
      <Abs />
      <Output />
    </div>
  );
};

export default AbsTloOutput;
