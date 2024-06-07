import { useSelector } from "react-redux";
import c from "./Output.module.css";
import { useCallback, useEffect, useState } from "react";
import api from "../../service/api";

const tq=d=>{
    let t=0;
    d.forEach(e => {
        t+=e.emb
    });
    return t;
}
const Output = (p) => {
  const { isLoged } = useSelector((s) => s.login);
  const [data, setData] = useState([]);
  const callbackmu = useCallback(async () => {
    try {
      const response = await fetch(`${api}/production-card/output-data`, {
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
      setData(d);
    } catch (e) {
      console.error(e);
    }
  }, [isLoged.token]);
  useEffect(() => {
    callbackmu();
  }, [callbackmu]);
  console.log(data);
  return (
    <div className={c.container}>
      <div className={c.title2}>
        <div className={c.line}></div>
        <h4 style={{ fontSize:"22px" }}>output</h4>
      </div>
      <div className={c.trainingH}>
        <div className={c.dater}>
          <div className={c.dataT}>
            <h3 style={{ color: "#E5E1DA" }}>date</h3>
          </div>
        </div>
        <div className={c.trainingD} style={{backgroundColor:"#929d96"}}>
          <div className={c.dataT}>
            <h3>crew</h3>
          </div>
        </div>
        <div className={c.trainingDi} style={{backgroundColor:"#e5e1da"}}>
          <div className={c.dataT}>
            <h3>total emb qte</h3>
          </div>
        </div>
      </div>
      <div className={c.wraper}>
        {data.map((m, i) => (
          <div className={c.trainingH} key={i} style={{ marginTop: 0 }}>
            <div className={c.dater}>
              <div className={c.dataT}>
                <h3 style={{ color: "#E5E1DA" }}>{m.date.split("T")[0]}</h3>
              </div>
            </div>
            <div className={c.trainingD}>
              <div className={c.dataT}>
                <h3>{m.crew}</h3>
              </div>
            </div>
            <div className={c.trainingDi}>
              <div className={c.dataT}>
                <h3>{tq(m.output)}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Output;
