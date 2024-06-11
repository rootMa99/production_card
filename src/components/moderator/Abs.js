import { useSelector } from "react-redux";
import c from "./Abs.module.css";
import api from "../../service/api";
import { useCallback, useEffect, useState } from "react";
import Chart from "./Chart";
import * as ExcelJS from "exceljs";
import Select from "react-select";
import DropdownIndicator from "..//UI/DropdownIndicator";
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minWidth: "10rem",
    minHeight: "20px",
    padding: "8px 0",
    fontSize: "15px",
    textTransform: "uppercase",
    borderRadius: "5px",
    fontFamily: `Formular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                      "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
                      "Segoe UI Symbol"`,
    textAlign: "center",
    outline: "none",
    border: "1px solid #F84018",
    backgroundColor: "transparent",
    boxShadow: "none",
    margin: "auto",
    "&:hover": {
      border: "1px solid #f33716",
      cursor: "pointer",
    },
  }),
  option: (provided, state) => ({
    width: "100%",
    padding: "10px 0",
    color: state.isFocused ? "#f3f3f3" : "#f33716",
    backgroundColor: state.isFocused && "#474b4d",
    fontFamily: `Formular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                      "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
                      "Segoe UI Symbol"`,
    textTransform: "uppercase",
    outline: "none",
    textAlign: "center",
    fontSize: "15px",
    "&:hover": {
      cursor: "pointer",
    },
  }),
  input: (provided) => ({
    ...provided,
    color: "#fff",
    fontSize: "15px",
    textAlign: "center",
  }),
  singleValue: (p) => ({
    ...p,
    color: "#fff",
  }),
  menuList: (provided) => ({
    maxHeight: "150px",
    overflowY: "auto",
    overflowX: "hidden",
    scrollbarWidth: "thin",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      width: "5px",
      backgroundColor: "#535151",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#f33716",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
  }),
};

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
const dataList = (d, t) => {
  const rd = [];
  d.forEach((m) => {
    if (rd.length === 0) {
      rd.push(m[t]);
    } else {
      const i = rd.findIndex((f) => f === m[t]);
      if (i === -1) {
        rd.push(m[t]);
      }
    }
  });
  return rd;
};
const Abs = (p) => {
  const { isLoged } = useSelector((s) => s.login);
  const [data, setData] = useState([]);
  const [filData, setFilData] = useState({
    matricule: [],
    family: [],
    month: [],
    tl: [],
    sl: [],
    coord: [],
    crew: [],
    project: [],
    reason: [],
  });
  let fd =
    filData.crew.length > 0
      ? data.filter((obj) => {
          return filData.crew.some((filterObj) => filterObj.value === obj.crew);
        })
      : data;
  fd =
    filData.matricule.length > 0
      ? data.filter((obj) => {
          return filData.matricule.some(
            (filterObj) => filterObj.value === obj.matricule
          );
        })
      : data;
  fd =
    filData.project.length > 0
      ? data.filter((obj) => {
          return filData.project.some(
            (filterObj) => filterObj.value === obj.project
          );
        })
      : data;
  fd =
    filData.reason.length > 0
      ? data.filter((obj) => {
          return filData.reason.some(
            (filterObj) => filterObj.value === obj.reason
          );
        })
      : data;
  fd =
    filData.family.length > 0
      ? data.filter((obj) => {
          return filData.family.some(
            (filterObj) => filterObj.value === obj.family
          );
        })
      : data;
  fd =
    filData.month.length > 0
      ? data.filter((obj) => {
          return filData.month.some(
            (filterObj) => filterObj.value === obj.month
          );
        })
      : data;
  fd =
    filData.tl.length > 0
      ? data.filter((obj) => {
          return filData.teamleader.some(
            (filterObj) => filterObj.value === obj.teamleader
          );
        })
      : data;
  fd =
    filData.sl.length > 0
      ? data.filter((obj) => {
          return filData.shiftleader.some(
            (filterObj) => filterObj.value === obj.shiftleader
          );
        })
      : data;
  fd =
    filData.coord.length > 0
      ? data.filter((obj) => {
          return filData.coordinator.some(
            (filterObj) => filterObj.value === obj.coordinator
          );
        })
      : data;
  fd =
    filData.reason.length > 0
      ? data.filter((obj) => {
          return filData.reason.some(
            (filterObj) => filterObj.value === obj.reason
          );
        })
      : data;
  const handleSelectChange = (e, t) => {
    switch (t) {
      case "matricule":
        setFilData((p) => ({ ...p, matricule: e }));
        break;
      case "crew":
        setFilData((p) => ({ ...p, crew: e }));
        break;
      case "project":
        setFilData((p) => ({ ...p, project: e }));
        break;
      case "reason":
        setFilData((p) => ({ ...p, reason: e }));
        break;
      case "family":
        setFilData((p) => ({ ...p, family: e }));
        break;
      case "month":
        setFilData((p) => ({ ...p, month: e }));
        break;
      case "tl":
        setFilData((p) => ({ ...p, tl: e }));
        break;
      case "sl":
        setFilData((p) => ({ ...p, sl: e }));
        break;
      case "coord":
        setFilData((p) => ({ ...p, coord: e }));
        break;
      default:
    }
  };
  const callbackmu = useCallback(async () => {
    try {
      const response = await fetch(
        `${api}/production-card/ab-data?from=${p.date.from}&to=${p.date.to}`,
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
      console.log("clabs:", d);
      setData(d);
    } catch (e) {
      console.error(e);
    }
  }, [isLoged.token, p.date]);
  useEffect(() => {
    callbackmu();
  }, [callbackmu]);
  console.log(
    getTotals(data),
    getDataTrated(data, "coordinator"),
    dataList(data, "family")
  );

  const generateExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("DATA ABS");

    if (data.length > 0) {
      const columns = [
        "Project",
        "Coordinator",
        "Shift Leader",
        "Team Leader",
        "Family",
        "Equipe",
        "Workstation",
        "Wk#",
        "Absent To",
        "MONTH",
        "Mle",
        "Reason",
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

      data.forEach((e, index) => {
        const row = {
          Project: e.project,
          Coordinator: e.coordinator,
          "Shift Leader": e.shiftleader,
          "Team Leader": e.teamleader,
          Family: e.family,
          Equipe: e.crew,
          Workstation: e.poste,
          "Wk#": e.wk,
          "Absent To": e.date,
          MONTH: e.month,
          Mle: e.matricule,
          Reason: e.reason,
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
      a.download = "DATA ABS.xlsx";
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className={c.container}>
      <div className={c.title2}>
        <div className={c.line}></div>
        <h4 style={{ fontSize: "22px" }}>Absenteeism</h4>
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
      <div className={c.filterArrea}>
        <div className={c.poinHold}>
          <span>matricule</span>
          <Select
            components={{ DropdownIndicator }}
            options={dataList(data, "matricule").map((m) => ({
              label: m,
              value: m,
            }))}
            id="multiSelect"
            inputId="shiftleader1"
            styles={customStyles}
            placeholder="select matricule"
            onChange={(e) => handleSelectChange(e, "matricule")}
            isMulti
          />
        </div>
        <div className={c.poinHold}>
          <span>Family</span>
          <Select
            components={{ DropdownIndicator }}
            options={dataList(data, "family").map((m) => ({
              label: m,
              value: m,
            }))}
            id="multiSelect"
            inputId="shiftleader1"
            styles={customStyles}
            placeholder="select Family"
            onChange={(e) => handleSelectChange(e, "family")}
            isMulti
          />
        </div>
        <div className={c.poinHold}>
          <span>month</span>
          <Select
            components={{ DropdownIndicator }}
            options={dataList(data, "month").map((m) => ({
              label: m,
              value: m,
            }))}
            id="multiSelect"
            inputId="shiftleader1"
            styles={customStyles}
            placeholder="select month"
            onChange={(e) => handleSelectChange(e, "month")}
            isMulti
          />
        </div>
        <div className={c.poinHold}>
          <span>teamleader</span>
          <Select
            components={{ DropdownIndicator }}
            options={dataList(data, "teamleader").map((m) => ({
              label: m,
              value: m,
            }))}
            id="multiSelect"
            inputId="shiftleader1"
            styles={customStyles}
            placeholder="select teamleader"
            onChange={(e) => handleSelectChange(e, "tl")}
            isMulti
          />
        </div>
        <div className={c.poinHold}>
          <span>shiftleader</span>
          <Select
            components={{ DropdownIndicator }}
            options={dataList(data, "shiftleader").map((m) => ({
              label: m,
              value: m,
            }))}
            id="multiSelect"
            inputId="shiftleader1"
            styles={customStyles}
            placeholder="select shiftleader"
            onChange={(e) => handleSelectChange(e, "sl")}
            isMulti
          />
        </div>
        <div className={c.poinHold}>
          <span>coordinator</span>
          <Select
            components={{ DropdownIndicator }}
            options={dataList(data, "coordinator").map((m) => ({
              label: m,
              value: m,
            }))}
            id="multiSelect"
            inputId="shiftleader1"
            styles={customStyles}
            placeholder="select coordinator"
            onChange={(e) => handleSelectChange(e, "coord")}
            isMulti
          />
        </div>
        <div className={c.poinHold}>
          <span>crew</span>
          <Select
            components={{ DropdownIndicator }}
            options={dataList(data, "crew").map((m) => ({
              label: m,
              value: m,
            }))}
            id="multiSelect"
            inputId="shiftleader1"
            styles={customStyles}
            placeholder="select crew"
            onChange={(e) => handleSelectChange(e, "crew")}
            isMulti
          />
        </div>
        <div className={c.poinHold}>
          <span>project</span>
          <Select
            components={{ DropdownIndicator }}
            options={dataList(data, "project").map((m) => ({
              label: m,
              value: m,
            }))}
            id="multiSelect"
            inputId="shiftleader1"
            styles={customStyles}
            placeholder="select project"
            onChange={(e) => handleSelectChange(e, "project")}
            isMulti
          />
        </div>
        <div className={c.poinHold}>
          <span>reason</span>
          <Select
            components={{ DropdownIndicator }}
            options={dataList(data, "reason").map((m) => ({
              label: m,
              value: m,
            }))}
            id="multiSelect"
            inputId="shiftleader1"
            styles={customStyles}
            placeholder="select reason"
            onChange={(e) => handleSelectChange(e, "reason")}
            isMulti
          />
        </div>
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
          <div className={c.dataT} style={{ width: "25%" }}>
            <h3>matricule</h3>
          </div>
          <div className={c.dataT} style={{ width: "25%" }}>
            <h3>tl</h3>
          </div>
          <div className={c.dataT} style={{ width: "25%" }}>
            <h3>sl</h3>
          </div>
          <div className={c.dataT} style={{ width: "25%" }}>
            <h3>coord</h3>
          </div>
        </div>
        <div className={c.trainingDi} style={{ width: "33.33%" }}>
          <div className={c.dataT} style={{ width: "20%" }}>
            <h3>poste</h3>
          </div>
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
        </div>
      </div>
      <div className={c.wraper}>
        {data.length === 0 ? (
          <h4 className={c.noCrewS}>no abs data HAS BEEN FOUND</h4>
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
                <div className={c.dataT} style={{ width: "25%" }}>
                  <h3 style={{ color: "#CF3335", fontWeight: 800 }}>
                    {m.matricule}
                  </h3>
                </div>
                <div className={c.dataT} style={{ width: "25%" }}>
                  <h3>{m.teamleader}</h3>
                </div>
                <div className={c.dataT} style={{ width: "25%" }}>
                  <h3>{m.shiftleader}</h3>
                </div>
                <div className={c.dataT} style={{ width: "25%" }}>
                  <h3>{m.coordinator}</h3>
                </div>
              </div>
              <div
                className={c.trainingDi}
                style={{ backgroundColor: "#e5e1da", width: "33.33%" }}
              >
                <div className={c.dataT} style={{ width: "20%" }}>
                  <h3>{m.poste}</h3>
                </div>
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
              </div>
            </div>
          ))
        )}
      </div>

      <div className={c.btnhelperholder}>
        <button className={c.button} type="button" onClick={generateExcel}>
          <span className={c["button__text"]}>Download Absent. as excel</span>
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

export default Abs;
