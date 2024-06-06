import { useCallback, useEffect, useState } from "react";
import c from "./MutHistory.module.css";
import api from "../../service/api";
import { useSelector } from "react-redux";
const MutHistory = (p) => {
  const { isLoged } = useSelector((s) => s.login);
  const [data, setData]=useState([]);
  const callbackmu = useCallback(async () => {
    try {
      const response = await fetch(`${api}/employee/transfer`, {
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
      console.log("cl1m:", d);
      setData(d)
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
        <h4>Mutation history</h4>
      </div>
      <div className={c.trainingH}>
        <div className={c.dater}>
          <div className={c.dataT} style={{ width: "60%" }}>
            <h3>date</h3>
          </div>
          <div className={c.dataT} style={{ width: "40%" }}>
            <h3>cmt by</h3>
          </div>
        </div>
        <div className={c.trainingDi}>
          <div className={c.dataT} style={{ width: "50%" }}>
            <h3>mlle</h3>
          </div>
          <div className={c.dataT} style={{ width: "50%" }}>
            <h3>crew</h3>
          </div>
        </div>
        <div className={c.trainingD}>
          <div className={c.dataT} style={{ width: "50%" }}>
            <h3>teamleader</h3>
          </div>
          <div className={c.dataT} style={{ width: "50%" }}>
            <h3>crew</h3>
          </div>
        </div>
      </div>
      <div className={c.wraper}>
      </div>
    </div>
  );
};

export default MutHistory;
