import { useState } from "react";
import c from "./AbsTloOutput.module.css";
import Output from "./Output";
import Abs from "./Abs";
import Tlo from "./Tlo";

const AbsTloOutput = (p) => {
  const [date, setDate] = useState({
    from: new Date().toISOString().split("T")[0],
    to: new Date().toISOString().split("T")[0],
  });
  return (
    <div className={c.container}>
      <div className={c.inputHolder}>
        <div className={c.inputD}>
          <h3>start date:</h3>
          <input
            type="date"
            value={date.from}
            onChange={(e) =>
              setDate((p) => ({
                ...p,
                from: e.target.value,
              }))
            }
            max={new Date().toISOString().split("T")[0]}
            pattern="yyyy-mm-dd"
          />
        </div>
        <div className={c.inputD}>
          <h3>end date:</h3>
          <input
            type="date"
            value={date.to}
            onChange={(e) =>
              setDate((p) => ({
                ...p,
                to: e.target.value,
              }))
            }
            max={new Date().toISOString().split("T")[0]}
            pattern="yyyy-mm-dd"
          />
        </div>
      </div>
      <Tlo date={date} />
      <Abs date={date} />
      <Output date={date} />
    </div>
  );
};

export default AbsTloOutput;
