import c from "./Abs.module.css";
import api from "../../service/api";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
const Tlo = (p) => {
  const { isLoged } = useSelector((s) => s.login);
  const [data, setData] = useState([]);

  const callbackmu = useCallback(async () => {
    try {
      const response = await fetch(`${api}/production-card/tlo-data`, {
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
  }, [isLoged.token]);
  useEffect(() => {
    callbackmu();
  }, [callbackmu]);
  return (
    <div className={c.container}>
      <div className={c.title2}>
        <div className={c.line}></div>
        <h4 style={{ fontSize: "22px" }}>tlo</h4>
      </div>

      <div className={c.trainingH}>
        <div className={c.dater} style={{ width: "33.33%" }}>
          <div className={c.dataT} style={{ width: "33.33%" }}>
            <h3 style={{ color: "#E5E1DA" }}>date</h3>
          </div>
          <div className={c.dataT} style={{ width: "33.33%" }}>
            <h3 style={{ color: "#E5E1DA" }}>week</h3>
          </div>
          <div className={c.dataT} style={{ width: "33.33%" }}>
            <h3 style={{ color: "#E5E1DA" }}>month</h3>
          </div>
        </div>
        <div className={c.trainingD} style={{ width: "33.33%" }}>
          <div className={c.dataT} style={{ width: "20%" }}>
            <h3>matricule</h3>
          </div>
          <div className={c.dataT} style={{ width: "20%" }}>
            <h3>tl</h3>
          </div>
          <div className={c.dataT} style={{ width: "20%" }}>
            <h3>sl</h3>
          </div>
          <div className={c.dataT} style={{ width: "20%" }}>
            <h3>coord</h3>
          </div>
          <div className={c.dataT} style={{ width: "20%" }}>
            <h3>poste</h3>
          </div>
        </div>
        <div className={c.trainingDi} style={{ width: "33.33%" }}>
          <div className={c.dataT} style={{ width: "20%" }}>
            <h3>crew</h3>
          </div>
          <div className={c.dataT} style={{ width: "20%" }}>
            <h3>family</h3>
          </div>
          <div className={c.dataT} style={{ width: "20%" }}>
            <h3>project</h3>
          </div>
          <div className={c.dataT} style={{ width: "20%" }}>
            <h3>reason</h3>
          </div>
          <div className={c.dataT} style={{ width: "20%" }}>
            <h3>hours</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tlo;
