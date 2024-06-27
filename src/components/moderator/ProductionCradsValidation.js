import { useCallback, useEffect, useState } from "react";
import c from "./ProductionCradsValidation.module.css";
import { useSelector } from "react-redux";
import api from "../../service/api";
import nof from "../../assets/nocards.svg";
import ls from "../../assets/icons8-list-100.png";
import col from "../../assets/icons8-collage-64.png";
import Select from "react-select";
import DropdownIndicator from "..//UI/DropdownIndicator";
import ProductionCardDetails from "./ProductionCardDetails";
import { isFriday } from "../hooks/daterelated";
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minWidth: "15rem",
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
    backgroundColor: state.isFocused && "#F84018",
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
  menu: (provided) => ({
    ...provided,
    zIndex: 4,
  }),
  menuList: (provided) => ({
    maxHeight: "150px",
    overflowY: "auto",
    overflowX: "hidden",
    scrollbarWidth: "thin",
    msOverflowStyle: "none",
    zIndex: 3,
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
const ProductionCradsValidation = (p) => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const { isLoged } = useSelector((s) => s.login);
  const [data, setData] = useState([]);
  const [list, setList] = useState(false);
  const [pd, setPd] = useState(null);
  const [filData, setFilData] = useState({
    family: [],
    tl: [],
    sl: [],
    coord: [],
    crew: [],
    project: [],
    valid: [],
  });
  //http req part
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
  //end http req part

  //filter part of code
  const handleSelectChange = (e, t) => {
    switch (t) {
      case "crew":
        setFilData((p) => ({ ...p, crew: e }));
        break;
      case "project":
        setFilData((p) => ({ ...p, project: e }));
        break;
      case "family":
        setFilData((p) => ({ ...p, family: e }));
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
      case "valid":
        setFilData((p) => ({ ...p, valid: e }));
        break;
      default:
    }
  };
  let fd =
    filData.crew.length > 0
      ? data.filter((obj) => {
          return filData.crew.some((filterObj) => filterObj.value === obj.crew);
        })
      : data;

  fd =
    filData.project.length > 0
      ? fd.filter((obj) => {
          return filData.project.some(
            (filterObj) => filterObj.value === obj.project
          );
        })
      : fd;

  fd =
    filData.family.length > 0
      ? fd.filter((obj) => {
          return filData.family.some(
            (filterObj) => filterObj.value === obj.family
          );
        })
      : fd;

  fd =
    filData.tl.length > 0
      ? fd.filter((obj) => {
          return filData.tl.some(
            (filterObj) => filterObj.value === obj.teamleader
          );
        })
      : fd;
  fd =
    filData.sl.length > 0
      ? fd.filter((obj) => {
          return filData.sl.some(
            (filterObj) => filterObj.value === obj.shiftleader
          );
        })
      : fd;
  fd =
    filData.coord.length > 0
      ? fd.filter((obj) => {
          return filData.coord.some(
            (filterObj) => filterObj.value === obj.coordinator
          );
        })
      : fd;
  fd =
    filData.valid.length > 0
      ? fd.filter((obj) => {
          return filData.valid.some(
            (filterObj) => filterObj.value === obj.isValid
          );
        })
      : fd;
  //end filter part
  const closeda = (e) => {
    setPd(null);
  };

  const rejectCard = async (i, t) => {
    try {
      const body = {
        cardId: i,
        isValid: t === "v" ? true : false,
      };
      console.log(body);
      const response = await fetch(`${api}/production-card/validation`, {
        method: "POST",
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
      callbackmu();
      setPd(null);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  return (
    <div className={c.container}>
      {pd !== null && (
        <ProductionCardDetails data={pd} close={closeda} reject={rejectCard} />
      )}
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
      {fd.length > 0 && (
        <div className={c.filterArrea}>
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
            <span>valid/not</span>
            <Select
              components={{ DropdownIndicator }}
              options={[
                {
                  label: "valid",
                  value: true,
                },
                {
                  label: "not valid",
                  value: false,
                },
              ]}
              id="multiSelect"
              inputId="shiftleader1"
              styles={customStyles}
              placeholder="select status"
              onChange={(e) => handleSelectChange(e, "valid")}
              isMulti
            />
          </div>
        </div>
      )}
      {fd.length > 0 && (
        <div className={c.imgContainer} onClick={(e) => setList((p) => !p)}>
          <img src={!list ? ls : col} alt="list" />
        </div>
      )}
      <div className={c.cardsContainer}>
        {fd.length === 0 ? (
          <div>
            <img
              className={c.noImag}
              src={nof}
              alt="no production card has been found"
            />
            <h4 className={c.noCrewS}>NO production card HAS BEEN FOUND!</h4>
          </div>
        ) : (
          fd.map((m) =>
            !list ? (
              <div className={c.card} key={m._id} onClick={(e) => setPd(m)}>
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
                      {`${getEmpl(m.employees).toFixed(2)}/${
                        m.employees.length
                      }`}
                    </span>
                  </div>
                  <p
                    className={c.para}
                    style={
                      m.isValid
                        ? {
                            margin: "auto",
                            fontWeight: "900",
                            textTransform: "uppercase",
                            color: "#006B63",
                          }
                        : {
                            margin: "auto",
                            fontWeight: "900",
                            textTransform: "uppercase",
                            color: "#f3090b",
                          }
                    }
                  >
                    {m.isValid ? "validate" : "not validate"}
                  </p>
                </div>
              </div>
            ) : (
              <div className={c.list} key={m._id} onClick={(e) => setPd(m)}>
                <div className={c.crewData}>
                  <p className={c.heading}>{m.crew}</p>
                  <p className={c.para}>{`${m.family} / ${m.project}`}</p>
                </div>
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
                      ? {
                          margin: "auto",
                          fontWeight: "900",
                          textTransform: "uppercase",
                          color: "#006B63",
                        }
                      : {
                          margin: "auto",
                          fontWeight: "900",
                          textTransform: "uppercase",
                          color: "#f3090b",
                        }
                  }
                >
                  {m.isValid ? "validate" : "not validate"}
                </p>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default ProductionCradsValidation;
