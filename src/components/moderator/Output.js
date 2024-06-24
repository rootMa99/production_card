import { useSelector } from "react-redux";
import c from "./Output.module.css";
import React, { useCallback, useEffect, useState } from "react";
import api from "../../service/api";
import * as ExcelJS from "exceljs";
const tq = (d) => {
  let t = 0;
  d.forEach((e) => {
    t += e.emb;
  });
  return t;
};
const extractData = (d) => {
  const rd = [];
  d.forEach((e) => {
    if (e.output.length === 0) {
      rd.push({
        date: e.date.split("T")[0],
        crew: e.crew,
        family: "",
        reference: "",
        ce: 0,
        prod: 0,
        emb: 0,
      });
    } else {
      e.output.map((m) =>
        rd.push({
          date: e.date.split("T")[0],
          crew: e.crew,
          family: m.family,
          reference: m.reference,
          ce: m.ce,
          prod: m.prod,
          emb: m.emb,
        })
      );
    }
  });
  return rd;
};
const Output = (p) => {
  const { isLoged } = useSelector((s) => s.login);
  const [data, setData] = useState([]);
  const [oid, setOid] = useState(null);
  const [dataOutp, setDataOutp] = useState(null);
  const callbackmu = useCallback(async () => {
    try {
      const response = await fetch(
        `${api}/production-card/output-data?from=${p.date.from}&to=${p.date.to}`,
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
  }, [isLoged.token, p.date]);
  useEffect(() => {
    callbackmu();
  }, [callbackmu]);
  console.log(data, oid);
  const toogle = (e) => {
    setOid(null);
  };
  const toogleid = (e, t) => {
    setOid(t);
    const o = data.filter((f) => f._id === t);
    console.log(o[0]);
    setDataOutp(o[0]);
  };

  const generateExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("output");

    if (data.length > 0) {
      const columns = [
        "date",
        "crew",
        "family",
        "reference",
        "ce",
        "prod",
        "emb",
      ];
      worksheet.columns = columns.map((column) => ({
        header: column,
        key: column,
        width: 25,
        height: 15,
        filterButton: true,
      }));
      worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
        if (rowNumber === 1) {
          row.eachCell({ includeEmpty: true }, function (cell) {
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "FFA211" },
            };
            cell.font = { bold: true };
          });
        }
      });

      extractData(data).forEach((e, index) => {
        const row = {
          date: e.date,
          crew: e.crew,
          family: e.family,
          reference: e.reference,
          ce: e.ce,
          prod: e.prod,
          emb: e.emb,
        };

        const worksheetRow = worksheet.addRow(row);
        if (index % 2 === 0) {
          worksheetRow.eachCell({ includeEmpty: true }, function (cell) {
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "D3D3D3" },
            };
          });
        }

        worksheetRow.eachCell({ includeEmpty: true }, function (cell) {
          cell.font = { color: { argb: "000000" } };
        });
        worksheet.eachRow((row, rowNumber) => {
          row.eachCell((cell) => {
            cell.alignment = { horizontal: "center", vertical: "center" };
          });
        });
      });
    }

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "output.xlsx";
      a.click();
      URL.revokeObjectURL(url);
    });
  };
  console.log("data exp", extractData(data));
  return (
    <div className={c.container}>
      <div className={c.title2}>
        <div className={c.line}></div>
        <h4 style={{ fontSize: "22px" }}>output</h4>
      </div>

      <div className={c.trainingH}>
        <div className={c.dater}>
          <div className={c.dataT}>
            <h3 style={{ color: "#E5E1DA" }}>date</h3>
          </div>
        </div>
        <div className={c.trainingD} style={{ backgroundColor: "#929d96" }}>
          <div className={c.dataT}>
            <h3>crew</h3>
          </div>
        </div>
        <div className={c.trainingDi} style={{ backgroundColor: "#e5e1da" }}>
          <div className={c.dataT}>
            <h3>total emb qte</h3>
          </div>
        </div>
      </div>
      <div className={c.wraper}>
        {data.length === 0 ? (
          <h4 className={c.noCrewS}>NO OUTPUT data HAS BEEN FOUND</h4>
        ) : (
          data.map((m, i) => (
            <React.Fragment>
              <div
                className={c.trainingH}
                key={m._id}
                style={{ marginTop: 0 }}
                onClick={(e) => (oid === m._id ? toogle() : toogleid(e, m._id))}
              >
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
              {oid === m._id && (
                <div className={c.plusData}>
                  {dataOutp.output.length > 0 ? (
                    <ul className={c.unList} key={i+1}>
                      <li className={c.lis}>
                        <span>family</span>
                        <span>reference</span>
                        <span>prod</span>
                        <span>ce</span>
                        <span>emb</span>
                      </li>
                      {dataOutp.output.map((m, i) => (
                        <li className={c.lisb} key={i}>
                          <span>{m.family}</span>
                          <span style={{ color: "#006B63", fontWeight: "800" }}>
                            {m.reference}
                          </span>
                          <span>{m.prod}</span>
                          <span>{m.ce}</span>
                          <span style={{ color: "#CF3335", fontWeight: "800" }}>
                            {m.emb}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <h4 className={c.quatro}>NO OUTPUT HAS BEEN FOUND</h4>
                  )}
                </div>
              )}
            </React.Fragment>
          ))
        )}
      </div>
      <div className={c.btnhelperholder}>
        <button className={c.button} type="button" onClick={generateExcel}>
          <span className={c["button__text"]}>Download output as excel</span>
          <span className={c["button__icon"]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 35 35"
              id="bdd05811-e15d-428c-bb53-8661459f9307"
              data-name="Layer 2"
              className={c.svg}
            >
              <path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path>
              <path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path>
              <path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Output;
