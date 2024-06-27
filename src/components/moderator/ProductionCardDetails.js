import c from "./ProductionCardDetails.module.css";
import lg from "../../assets/aptiv-logo.svg";
import { isFriday } from "../hooks/daterelated";
import Chart from "./Chart";
import React, { useState } from "react";
import ModifyPointing from "./ModifyPointing";
import api from "../../service/api";
import { useSelector } from "react-redux";
const getEmpl = (d) => {
  let r = 0;
  d.forEach((e) => {
    if (isFriday(new Date().toISOString().split("T")[0])) {
      r += e.paidHour === undefined ? 0 / 7.58 : e.paidHour / 7.58;
    } else {
      r += e.paidHour === undefined ? 0 / 7.67 : e.paidHour / 7.67;
    }
  });
  return r;
};
const getph = (d) => {
  let r = 0;
  d.map((m) => (r += m.paidHour));

  return r;
};
const getDataBypointing = (d) => {
  const rd = [];
  d.forEach((e) => {
    if (rd.length === 0) {
      rd.push({
        name: e.pointing,
        nb: 1,
      });
    } else {
      const i = rd.findIndex((f) => f.name === e.pointing);
      if (i !== -1) {
        rd[i].nb += 1;
      } else {
        rd.push({
          name: e.pointing,
          nb: 1,
        });
      }
    }
  });
  return rd;
};
const ProductionCardDetails = (p) => {
  const [rowTM, setRowTM] = useState(null);
  const { isLoged } = useSelector((s) => s.login);
  console.log(p.data, getDataBypointing(p.data.employees));

  const rejectOrValid = (e, t) => {
    p.reject(p.data._id, t);
    return;
  };

  const close = (e) => {
    setRowTM(null);
  };
  const postSingleEmpl = async (d, m, ph, id) => {
    try {
      const body = {
        matricule: m,
        paidHour: ph,
        pointing: d.pointing,
        pointingOptions: d.pointingOptions,
        ctn: d.ctnDuration,
        cte: 0,
        ctf: 0,
        ot: d.otDuration,
        t: d.tDuration,
        cr: d.crDuration,
        retard: d.retardDuration,
        status: d.status,
        motif: d.motif,
        details: d.details,
      };
      console.log(body);
      const response = await fetch(`${api}/production-card/pointing-for-one/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLoged.token}`,
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      const da = await response.json();
      console.log("pfo:", da);
      // callback();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };
  return (
    <React.Fragment>
      {rowTM !== null && <ModifyPointing data={rowTM} close={close} singleEmpl={postSingleEmpl} />}
      <div className={c.container}>
        {!p.data.isValid && (
          <p className={c.caution}>
            Caution: This card has not yet been validated.
          </p>
        )}
        <span className={c.close} onClick={(e) => p.close()}>
          close
        </span>
        <div className={c.head}>
          <h2>{p.data.crew}</h2>
          <h3>
            {p.data.family} / {p.data.project}
          </h3>
        </div>
        <div className={c.crewDetails}>
          <div className={c.details}>
            <span>teamleader:</span>
            <span className={c.imp}>{p.data.teamleader}</span>
          </div>
          <div className={c.details}>
            <span>shiftleader:</span>
            <span className={c.imp}>{p.data.shiftleader}</span>
          </div>
          <div className={c.details}>
            <span>coordinator:</span>
            <span className={c.imp}>{p.data.coordinator}</span>
          </div>
        </div>
        <div className={c.crewDetails}>
          <div className={c.details}>
            <span>headcount:</span>
            <span className={c.imp}>{`${getEmpl(p.data.employees).toFixed(
              2
            )} / ${p.data.employees.length}`}</span>
          </div>
          <div className={c.details}>
            <span>shift:</span> <span className={c.imp}>{p.data.shift}</span>
          </div>
          <div className={c.details}>
            <span>total paid hours:</span>
            <span className={c.imp}>{getph(p.data.employees).toFixed(2)}</span>
          </div>
        </div>
        <div className={c.bodyC}>
          <div className={c.charth}>
            <Chart
              data={getDataBypointing(p.data.employees).sort((a, b) => {
                return b.nb - a.nb;
              })}
              title="employees by pointing"
            />
          </div>
          <h3 className={c.pointingListt}>pointing list:</h3>
          <div className={c.pointingList}>
            <table className={c.table}>
              <thead>
                <tr>
                  <th>matricule</th>
                  <th>poste</th>
                  <th>pointing</th>
                  <th>add. pointing</th>
                  <th>ot</th>
                  <th>cr</th>
                  <th>ctn</th>
                  <th>details</th>
                  <th>motif</th>
                  <th>cte</th>
                  <th>retard</th>
                  <th>T</th>
                  <th>status</th>
                  <th width="15%">
                    mut. to <br /> (tl/crew/hr)*
                  </th>
                  <th>paid Hour</th>
                </tr>
              </thead>
              <tbody>
                {p.data.employees.map((m) => (
                  <tr
                    key={m._id}
                    className={c.hovertr}
                    onClick={(e) => setRowTM(m)}
                  >
                    <td
                      style={{
                        color: "#FFA211",
                        fontWeight: "900",
                        fontSize: "17px",
                      }}
                    >
                      {m.matricule}
                    </td>
                    <td>{m.poste.trim() === "" ? "--" : m.poste}</td>
                    <td style={{ color: "#006B63", fontWeight: "900" }}>
                      {m.pointing}
                    </td>
                    <td>
                      {m.pointingOptions.length === 0 ? (
                        "--"
                      ) : (
                        <ul>
                          {m.pointingOptions.map((m,i) => (
                            <li key={i}>{m}</li>
                          ))}
                        </ul>
                      )}
                    </td>
                    <td>{m.ot.toFixed(2)}</td>
                    <td>{m.cr.toFixed(2)}</td>
                    <td>{m.ctn.toFixed(2)}</td>
                    <td>{m.details.trim() === "" ? "--" : m.details}</td>
                    <td> {m.motif.trim() === "" ? "--" : m.motif}</td>
                    <td>{m.cte.toFixed(2)}</td>
                    <td>{m.retard.toFixed(2)}</td>
                    <td>{m.t.toFixed(2)}</td>
                    <td>{m.status.trim() === "" ? "--" : m.status}</td>
                    <td>
                      {m.pointing === "mutation" ? (
                        `${m.to.teamleader} / ${m.to.crew} / ${
                          m.to.isDefinitely ? "def" : "prov"
                        }`
                      ) : m.toMany.length === 0 ? (
                        "--"
                      ) : (
                        <ul>
                          {m.toMany.map((m,i) => (
                            <li style={{ textAlign: "center" }} key={`${i}_idsdef`}>{`${
                              m.teamleader
                            } / ${m.crew} / ${m.paidHour.toFixed(2)}`}</li>
                          ))}
                        </ul>
                      )}
                    </td>
                    <td
                      style={{
                        color: "#FFA211",
                        fontWeight: "900",
                        fontSize: "17px",
                      }}
                    >
                      {m.paidHour.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
          <h3 className={c.pointingListt}>Output list:</h3>
          <div className={c.pointingList}>
            <table className={c.table}>
              <thead>
                <tr>
                  <th>family</th>
                  <th>reference</th>
                  <th>ce</th>
                  <th>exig</th>
                  <th>prod</th>
                  <th>emb</th>
                  <th>exigency</th>
                  <th>cuting</th>
                  <th>lead Prep</th>
                  <th>final Assembly</th>
                  <th>comment</th>
                </tr>
              </thead>
              <tbody>
                {p.data.output.map((m) => (
                  <tr key={m._id}>
                    <td
                      style={{
                        color: "#FFA211",
                        fontWeight: "900",
                        fontSize: "17px",
                      }}
                    >
                      {m.family}
                    </td>
                    <td
                      style={{
                        color: "#FFA211",
                        fontWeight: "900",
                        fontSize: "17px",
                      }}
                    >
                      {m.reference}
                    </td>
                    <td style={{ color: "#4E7C88", fontWeight: "900" }}>
                      {m.ce}
                    </td>
                    <td style={{ color: "#3BC6EB", fontWeight: "900" }}>
                      {m.exig}
                    </td>
                    <td style={{ color: "#00AC9E", fontWeight: "900" }}>
                      {m.prod}
                    </td>

                    <td style={{ color: "#006B63", fontWeight: "900" }}>
                      {m.emb}
                    </td>
                    <td>{m.exigency.toFixed(2)}</td>
                    <td>{m.cuting}</td>
                    <td>{m.leadPrep}</td>
                    <td>{m.finalAssembly}</td>
                    <td
                      style={{
                        color: "#FFA211",
                        fontWeight: "900",
                        fontSize: "17px",
                      }}
                    >
                      {m.comment}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div>
          <button className={c.buttonr} onClick={(e) => rejectOrValid(e, "r")}>
            Reject
          </button>
          <span
            style={{
              color: "#FFA211",
              fontWeight: "900",
              fontSize: "17px",
            }}
          >
            OR
          </span>
          <button className={c.button} onClick={(e) => rejectOrValid(e, "v")}>
            validate
          </button>
        </div>
        <img className={c.imglg} src={lg} alt="logo" />
      </div>
    </React.Fragment>
  );
};

export default ProductionCardDetails;
