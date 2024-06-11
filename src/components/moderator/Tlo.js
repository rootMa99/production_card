import c from "./Abs.module.css";
import api from "../../service/api";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import Chart from "./Chart";

const getTotals = (d) => {
    const rd = [];
    d.forEach((e) => {
      if (rd.length === 0) {
        rd.push({
          name: e.reason,
          nb: 1,
        });
      } else {
        const i = rd.findIndex((f) => f.name === e.reason);
        if (i !== -1) {
          rd[i].nb++;
        } else {
          rd.push({
            name: e.reason,
            nb: 1,
          });
        }
      }
    });
    try {
      rd.sort((a, b) => {
        return b.nb - a.nb;
      });
      return rd;
    } catch (e) {
      return rd;
    }
  };
  const getDataTrated = (d, t) => {
    const rd = [];
    d.forEach((e) => {
      if (rd.length === 0) {
        rd.push({
          name: e[t],
          nb: 1,
        });
      } else {
        const i = rd.findIndex((f) => f.name === e[t]);
        if (i !== -1) {
          rd[i].nb++;
        } else {
          rd.push({
            name: e[t],
            nb: 1,
          });
        }
      }
    });
    try {
      rd.sort((a, b) => {
        return b.nb - a.nb;
      });
      return rd;
    } catch (e) {
      return rd;
    }
  };
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
      <div className={c.charth}>
      <Chart title="abs by reason" data={getTotals(data)} />
      <Chart title="abs by family" data={getDataTrated(data, "family")} />
      <Chart title="abs by project" data={getDataTrated(data, "project")} />
      <Chart
        title="abs by coordinator"
        data={getDataTrated(data, "coordinator")}
      />
      <Chart
        title="abs by shiftleader"
        data={getDataTrated(data, "shiftleader")}
      />
      <Chart
        title="abs by teamleader"
        data={getDataTrated(data, "teamleader")}
      />
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
      <div className={c.wraper}>
        {data.length === 0 ? (
          <h4 className={c.noCrewS}>no found</h4>
        ) : (
          data.map((m) => (
            <div className={c.trainingH} style={{ marginTop: 0 }}>
              <div className={c.dater} style={{ width: "33.33%" }}>
                <div className={c.dataT} style={{ width: "33.33%" }}>
                  <h3 style={{ color: "#E5E1DA" }}>{m.date}</h3>
                </div>
                <div className={c.dataT} style={{ width: "33.33%" }}>
                  <h3 style={{ color: "#E5E1DA" }}>{m.wk}</h3>
                </div>
                <div className={c.dataT} style={{ width: "33.33%" }}>
                  <h3 style={{ color: "#E5E1DA" }}>{m.month}</h3>
                </div>
              </div>
              <div
                className={c.trainingD}
                style={{ backgroundColor: "#929d96", width: "33.33%" }}
              >
                <div className={c.dataT} style={{ width: "20%" }}>
                  <h3 style={{ color: "#CF3335", fontWeight: 800 }}>
                    {m.matricule}
                  </h3>
                </div>
                <div className={c.dataT} style={{ width: "20%" }}>
                  <h3>{m.teamleader}</h3>
                </div>
                <div className={c.dataT} style={{ width: "20%" }}>
                  <h3>{m.shiftleader}</h3>
                </div>
                <div className={c.dataT} style={{ width: "20%" }}>
                  <h3>{m.coordinator}</h3>
                </div>
                <div className={c.dataT} style={{ width: "20%" }}>
                  <h3>{m.poste}</h3>
                </div>
              </div>
              <div
                className={c.trainingDi}
                style={{ backgroundColor: "#e5e1da", width: "33.33%" }}
              >
                <div className={c.dataT} style={{ width: "20%" }}>
                  <h3>{m.crew}</h3>
                </div>
                <div className={c.dataT} style={{ width: "20%" }}>
                  <h3>{m.family}</h3>
                </div>
                <div className={c.dataT} style={{ width: "20%" }}>
                  <h3>{m.project}</h3>
                </div>
                <div className={c.dataT} style={{ width: "20%" }}>
                  <h3 style={{ color: "#CF3335", fontWeight: 800 }}>
                    {m.reason}
                  </h3>
                </div>
                <div className={c.dataT} style={{ width: "20%" }}>
                  <h3 style={{ color: "#CF3335", fontWeight: 800 }}>
                    {m.hours}
                  </h3>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Tlo;