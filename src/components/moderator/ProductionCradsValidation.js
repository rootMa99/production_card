import { useState } from "react";
import c from "./ProductionCradsValidation.module.css";

const ProductionCradsValidation = (p) => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  return (
    <div className={c.container}>
      <div className={c.inputHolder}>
        <div className={c.inputD}>
          <h3>select date:</h3>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            pattern="yyyy-mm-dd"
          />
        </div>
      </div>
      <div className={c.title2}>
        <div className={c.line}></div>
        <h4 style={{ fontSize: "25px" }}>Production cards</h4>
      </div>
    </div>
  );
};

export default ProductionCradsValidation;
