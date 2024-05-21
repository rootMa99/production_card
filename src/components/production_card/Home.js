import React, { useCallback, useEffect, useState } from "react";
import c from "./Home.module.css";
import Select from "react-select";
import DropdownIndicator from "../UI/DropdownIndicator";
import "./SelectCSS.css";
import Pointing from "./Pointing";
import PointingList from "./PointingList";
import { useSelector } from "react-redux";
import api from "../../service/api";
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "8rem",
    fontSize: "10px",
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
    width: "97%",
    padding: "2px 0",
    color: state.isFocused ? "#f3f3f3" : "#f33716",
    backgroundColor: state.isFocused && "#474b4d",
    fontFamily: `Formular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
                    "Segoe UI Symbol"`,
    textTransform: "uppercase",
    outline: "none",
    textAlign: "center",
    fontSize: "10px",
    "&:hover": {
      cursor: "pointer",
    },
  }),
  input: (provided) => ({
    ...provided,
    color: "#f3f3f3",
  }),
  singleValue: (p) => ({
    ...p,
    color: "#f3f3f3",
  }),
  menuList: (provided) => ({
    maxHeight: "200px",
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

const Home = (p) => {
  const [today, setToday] = useState(new Date().toISOString().split("T")[0]);
  const [control, setControl] = useState("pbl");
  const [shift, setShift] = useState(null);
  const [data, setData] = useState([]);
  const [employeeCrew, setEmplpyeeCrew] = useState(null);
  const { isLoged } = useSelector((s) => s.login);
  const callback = useCallback(async () => {
    try {
      const response = await fetch(
        `${api}/employee/by_crew_tlx/?date=${today}`,
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
      console.log("cl1:", d);
      setData(d);
    } catch (e) {
      console.error(e);
    }
  }, [isLoged.token, today]);
  useEffect(() => {
    callback();
  }, [callback]);

  const postMultiEmpl = async (d, m, ph) => {
    if (shift === null) {
      alert("please select shift!");
      return false;
    }
    try {
      const body = {
        date: today,
        crew: employeeCrew,
        shift: shift,
        matricule: m,
        paidHour: ph,
        pointing: d.pointing,
        pointingOptions: d.pointingOptions,
        ctn: d.ctnDuration,
        cte: 0,
        ctf: 0,
        ot: d.otDuration,
        t: d.tDuration,
        retard: d.retardDuration,
        status: d.status,
        motif: d.motif,
        details: d.details,
      };
      const response = await fetch(`${api}/production-card/pointing-for-one/`, {
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
      callback();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };
  const postSingleEmpl = (d) => {};
  return (
    <div className={c.container}>
      <div className={c.inputsContainer}>
        <div className={c.inputD}>
          <h3>select date:</h3>
          <input
            type="date"
            value={today}
            onChange={(e) => setToday(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            pattern="yyyy-mm-dd"
          />
        </div>
        <div className={c.inputD}>
          <Select
            components={{ DropdownIndicator }}
            options={data.map((m) => ({
              label: m._id.crew,
              value: m._id.crew,
            }))}
            id="multiSelect"
            inputId="shiftleader1"
            styles={customStyles}
            placeholder="select crew"
            onChange={(e) =>
              setEmplpyeeCrew(...data.filter((f) => f._id.crew === e.value))
            }
          />
          <Select
            components={{ DropdownIndicator }}
            options={[
              { label: "morning", value: "morning" },
              { label: "evening", value: "evening" },
              { label: "night", value: "night" },
            ]}
            id="multiSelect"
            inputId="shiftleader1"
            styles={customStyles}
            placeholder="select shift"
          />
        </div>
      </div>
      {employeeCrew === null ? (
        <h4 className={c.noCrewS}>Please select crew to proceed</h4>
      ) : (
        <React.Fragment>
          <div className={c.title}>
            <span></span>
            <h3> head count statistics</h3>
            <span></span>
          </div>
          <div className={c.hcContainer}>
            <div className={c.data}>
              <h3>headcount</h3>
              <span>
                {employeeCrew === null ? 0 : employeeCrew.employees.length}
              </span>
            </div>
            <div className={c.data}>
              <h3>actual headcount</h3>
              <span>78</span>
            </div>
            <div className={c.data}>
              <h3>target</h3>
              <span>78</span>
            </div>
            <div className={c.data}>
              <h3>gap</h3>
              <span>0</span>
            </div>
          </div>
          <div className={c.title2}>
            <div className={c.line}></div>
            <h4>Pointing</h4>
          </div>

          <ul className={c.underList}>
            <li
              style={
                control === "pbl"
                  ? { opacity: 1, borderBottom: "2px solid white" }
                  : {}
              }
              onClick={(e) => setControl("pbl")}
            >
              Pointing by list
            </li>

            <li
              style={
                control === "pbc"
                  ? { opacity: 1, borderBottom: "2px solid white" }
                  : {}
              }
              onClick={(e) => setControl("pbc")}
            >
              Pointing by category
            </li>
          </ul>
          {control === "pbc" && <Pointing />}
          {control === "pbl" && (
            <PointingList
              data={employeeCrew === null ? [] : employeeCrew.employees}
              selectst={customStyles}
              singleEmpl={postSingleEmpl}
              multiEmpl={postMultiEmpl}
            />
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default Home;
