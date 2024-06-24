import { useCallback, useEffect, useState } from "react";
import c from "./ProductionCradsValidation.module.css";
import { useSelector } from "react-redux";
import api from "../../service/api";

const getEmpl = (d) => {
  let r = 0;
  d.map((m) => (r += m.paidHour));

  return r / 7.67;
};

const ProductionCradsValidation = (p) => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const { isLoged } = useSelector((s) => s.login);
  const [data, setData] = useState([]);
  const callbackmu = useCallback(async () => {
    try {
      const response = await fetch(`${api}/production-card/?date=${date}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLoged.token}`,
        },
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      const d = await response.json();
      console.log("clabs:", d);
      setData(d);
    } catch (e) {
      console.error(e);
    }
  }, [isLoged.token, date]);
  useEffect(() => {
    callbackmu();
  }, [callbackmu]);
  console.log(data);
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
      <div className={c.cardsContainer}>
        {data.length === 0 ? (
          <h2>no card was found</h2>
        ) : (
          data.map((m) => (
            <div className={c.card} key={m._id}>
              <div className={c.content}>
                <p className={c.heading}>{m.crew}</p>
                <p className={c.para}>{`${m.family} / ${m.project}`}</p>
                <div className={c.contina}>
                  <span>teamleader:</span>
                  <span style={{ fontWeight: "bold" }}>{m.teamleader}</span>
                </div>
                <div className={c.contina}>
                  <span>shift:</span>
                  <span style={{ fontWeight: "bold" }}>{m.shift}</span>
                </div>
                <div className={c.contina}>
                  <span>head count:</span>
                  <span style={{ fontWeight: "bold" }}>
                    {`${getEmpl(m.employees).toFixed(1)}/${m.employees.length}`}
                  </span>
                </div>
                <p
                  className={c.para}
                  style={
                    m.isValid
                      ? { margin: "auto", fontWeight: "900", textTransform: "uppercase", color: "#006B63" }
                      : { margin: "auto", fontWeight: "900", textTransform: "uppercase", color:"#f3090b" }
                  }
                >
                  {m.isValid ? "validate" : "not validate"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductionCradsValidation;
