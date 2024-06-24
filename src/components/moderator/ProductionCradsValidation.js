import { useCallback, useEffect, useState } from "react";
import c from "./ProductionCradsValidation.module.css";
import { useSelector } from "react-redux";
import api from "../../service/api";
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
      <div className={c.card}>
        <div className={c.content}>
          <p className={c.heading}>Card</p>
          <p className={c.para}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi
            laboriosam at voluptas minus culpa deserunt delectus sapiente
            inventore pariatur
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductionCradsValidation;
