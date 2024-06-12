import { useCallback, useEffect, useState } from "react";
import c from "./MutHistory.module.css";
import api from "../../service/api";
import { useSelector } from "react-redux";
const MutHistory = (p) => {
  const { isLoged } = useSelector((s) => s.login);
  const [data, setData] = useState([]);
  const callbackmu = useCallback(async () => {
    try {
      const response = await fetch(
        p.type === "admin"
          ? `${api}/employee/transfer`
          : `${api}/employee/transfer/?teamleader=${isLoged.mtll}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isLoged.token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(response.status);
      }
      const d = await response.json();
      console.log("cl1m:", d);
      setData(d);
    } catch (e) {
      console.error(e);
    }
  }, [isLoged.token, isLoged.mtll, p.type]);
  useEffect(() => {
    callbackmu();
  }, [callbackmu]);

  const clickHn=(e, i)=>{

  }

  return (
    <div className={c.container}>
      <div className={c.title2}>
        <div
          className={c.line}
          style={p.type === "admin" ? { width: "45%" } : {}}
        ></div>
        <h4>Mutation history</h4>
      </div>
      <div className={c.aidVcon}>
        <div className={c.aidV}>
          <span style={{ backgroundColor: "#929d96" }}></span>
          <h3 style={{ color: "#929d96" }}>from</h3>
        </div>
        <div className={c.aidV}>
          <span style={{ backgroundColor: "#e5e1da" }}></span>
          <h3 style={{ color: "#e5e1da" }}>To</h3>
        </div>
      </div>
      <div className={c.trainingH}>
        <div className={c.dater}>
          <div className={c.dataT} style={{ width: "60%" }}>
            <h3
              style={
                p.type === "admin"
                  ? { color: "#E5E1DA", fontSize: "15px" }
                  : { color: "#E5E1DA" }
              }
            >
              date
            </h3>
          </div>
          <div className={c.dataT} style={{ width: "40%" }}>
            <h3
              style={
                p.type === "admin"
                  ? { color: "#E5E1DA", fontSize: "15px" }
                  : { color: "#E5E1DA" }
              }
            >
              cmt by
            </h3>
          </div>
        </div>
        <div
          className={c.dater}
          style={{ backgroundColor: "#383942", width: "20%" }}
        >
          <div className={c.dataT}>
            <h3 style={p.type === "admin" ? { fontSize: "15px" } : {}}>
              employee
            </h3>
          </div>
        </div>
        <div className={c.trainingDi}>
          <div className={c.dataT} style={{ width: "50%" }}>
            <h3 style={p.type === "admin" ? { fontSize: "15px" } : {}}>
              tl src
            </h3>
          </div>
          <div className={c.dataT} style={{ width: "50%" }}>
            <h3 style={p.type === "admin" ? { fontSize: "15px" } : {}}>
              crew src
            </h3>
          </div>
        </div>
        <div className={c.trainingD}>
          <div className={c.dataT} style={{ width: "50%" }}>
            <h3 style={p.type === "admin" ? { fontSize: "15px" } : {}}>
              tl des
            </h3>
          </div>
          <div className={c.dataT} style={{ width: "50%" }}>
            <h3 style={p.type === "admin" ? { fontSize: "15px" } : {}}>
              crew des
            </h3>
          </div>
        </div>
        <div className={c.dater} style={{ width: "20%" }}>
          <div className={c.dataT}>
            <h3
              style={
                p.type === "admin"
                  ? { color: "#FFA211", fontSize: "15px" }
                  : { color: "#FFA211" }
              }
            >
              mut type
            </h3>
          </div>
          <div className={c.dataT}>
            <h3
              style={
                p.type === "admin"
                  ? { color: "#FFA211", fontSize: "15px" }
                  : { color: "#FFA211" }
              }
            >
              refused
            </h3>
          </div>
        </div>
      </div>
      <div className={c.wraper}>
        {data.length > 0 ? (
          data.map((m) => (
            <div className={c.trainingH} key={m._id} style={{ margin: 0 }} onClick={e=>""}>
              <div className={c.dater}>
                <div className={c.dataT} style={{ width: "60%" }}>
                  <h3
                    style={
                      p.type === "admin"
                        ? { color: "#E5E1DA", fontSize: "13px" }
                        : { color: "#E5E1DA" }
                    }
                  >
                    {m.date.split("T")[0]}
                  </h3>
                </div>
                <div className={c.dataT} style={{ width: "40%" }}>
                  <h3
                    style={
                      p.type === "admin"
                        ? { color: "#E5E1DA", fontSize: "13px" }
                        : { color: "#E5E1DA" }
                    }
                  >
                    {m.requestedBy}
                  </h3>
                </div>
              </div>
              <div
                className={c.dater}
                style={{ backgroundColor: "#383942", width: "20%" }}
              >
                <div className={c.dataT}>
                  <h3 style={p.type === "admin" ? { fontSize: "13px" } : {}}>
                    {m.matricule}
                  </h3>
                </div>
              </div>
              <div className={c.trainingDi}>
                <div className={c.dataT} style={{ width: "50%" }}>
                  <h3 style={p.type === "admin" ? { fontSize: "13px" } : {}}>
                    {m.from.teamleader}
                  </h3>
                </div>
                <div className={c.dataT} style={{ width: "50%" }}>
                  <h3 style={p.type === "admin" ? { fontSize: "13px" } : {}}>
                    {m.from.crew}
                  </h3>
                </div>
              </div>
              <div className={c.trainingD}>
                <div className={c.dataT} style={{ width: "50%" }}>
                  <h3 style={p.type === "admin" ? { fontSize: "13px" } : {}}>
                    {m.to.teamleader}
                  </h3>
                </div>
                <div className={c.dataT} style={{ width: "50%" }}>
                  <h3 style={p.type === "admin" ? { fontSize: "13px" } : {}}>
                    {m.to.crew}
                  </h3>
                </div>
              </div>
              <div className={c.dater} style={{ width: "20%" }}>
                <div className={c.dataT}>
                  <h3
                    style={
                      p.type === "admin"
                        ? { color: "#FFA211", fontSize: "13px" }
                        : { color: "#FFA211" }
                    }
                  >
                    {m.to.isDefinitely ? "prv*" : " defv**"}
                  </h3>
                </div>
                <div className={c.dataT}>
                  <h3
                    style={
                      p.type === "admin"
                        ? m.isRefused
                          ? { color: "#CF3335", fontSize: "13px" }
                          : { color: "#006B63", fontSize: "13px" }
                        : m.isRefused
                        ? { color: "#CF3335" }
                        : { color: "#006B63" }
                    }
                  >
                    {m.isRefused ? "yes" : "no"}
                  </h3>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h4 className={c.noCrewS}>
            No mutations have been recorded in the history.
          </h4>
        )}
      </div>
      <div className={c.aidVcon}>
        <div className={c.aidV}>
          <h3>
            <mark>prv*</mark> = provisoire
          </h3>
        </div>
        <div className={c.aidV}>
          <h3>
            <mark>defv**</mark> = définitive
          </h3>
        </div>
      </div>
    </div>
  );
};

export default MutHistory;
