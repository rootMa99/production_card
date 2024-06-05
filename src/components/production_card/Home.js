import React, { useCallback, useEffect, useState } from "react";
import c from "./Home.module.css";
import Select from "react-select";
import DropdownIndicator from "../UI/DropdownIndicator";
import "./SelectCSS.css";
import Pointing from "./Pointing";
import PointingList from "./PointingList";
import { useSelector } from "react-redux";
import api from "../../service/api";
import { isFriday } from "../hooks/daterelated";
import Output from "./Output";
import NetworkNotify from "../UI/NetworkNotify";
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
    padding: "10px 0",
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

const calculateActualHeadCount = (d, dt) => {
  let r = 0;
  d.forEach((e) => {
    if (isFriday(dt)) {
      r += e.paidHour === undefined ? 0 / 7.58 : e.paidHour / 7.58;
    } else {
      r += e.paidHour === undefined ? 0 / 7.67 : e.paidHour / 7.67;
    }
  });
  return r;
};
const calculateActualPaidHours = (d) => {
  let r = 0;
  d.forEach((e) => {
    r += e.paidHour === undefined ? 0 : e.paidHour;
  });
  return r;
};

const Home = (p) => {
  const [today, setToday] = useState(new Date().toISOString().split("T")[0]);
  const [control, setControl] = useState("pbl");
  const [shift, setShift] = useState(null);
  const [data, setData] = useState([]);
  const [datam, setDatam] = useState([]);
  const [employeeCrew, setEmplpyeeCrew] = useState(null);
  const [cr, setCr] = useState("");
  const [ph, setPh] = useState(0);
  const [emb, setEmb] = useState(0);
  const [err, setErr] = useState(false);
  const [success, setsuccess] = useState(false);
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
  const callbackmu = useCallback(async () => {
    if (employeeCrew !== null) {
      console.log(isLoged.mtll, employeeCrew._id.crew);
      try {
        const response = await fetch(
          `${api}/employee/transfer/?date=${today}&teamleader=${isLoged.mtll}&crew=${employeeCrew._id.crew}`,
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
        setDatam(d);
      } catch (e) {
        console.error(e);
      }
    }
  }, [isLoged.token, isLoged.mtll, today, employeeCrew]);
  useEffect(() => {
    callbackmu();
  }, [callbackmu]);

  const postSingleEmpl = async (d, m, ph, mmd) => {
    if (shift === null) {
      alert("please select shift!");
      return false;
    }
    try {
      const body = {
        date: today,
        crew: employeeCrew._id.crew,
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
        cr: d.crDuration,
        retard: d.retardDuration,
        status: d.status,
        motif: d.motif,
        details: d.details,
        to: {
          teamleader: d.ttl,
          crew: d.tCrew,
          isDefinitely: d.mutType === "temporelle" ? false : true,
        },
        toMany: mmd !== undefined ? mmd : [],
      };
      console.log(body);
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
      console.log("pfo:", da, employeeCrew);
      callback();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };
  const postMultiEmpl = async (d, m, ph) => {
    console.log("paid hour", ph);
    try {
      const body = m.map((m) => ({
        date: today,
        crew: employeeCrew._id.crew,
        shift: shift,
        matricule: m.matricule === undefined ? m : m.matricule,
        paidHour: ph,
        pointing: d.pointing,
        pointingOptions: d.pointingOptions,
        ctn: d.ctnDuration,
        cte: 0,
        ctf: 0,
        ot: d.otDuration,
        cr: d.crDuration,
        t: d.tDuration,
        retard: d.retardDuration,
        status: d.status,
        motif: d.motif,
        details: d.details,
      }));
      console.log(body);
      const response = await fetch(
        `${api}/production-card/pointing-for-many/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isLoged.token}`,
          },
          body: JSON.stringify(body),
        }
      );
      if (!response.ok) {
        throw new Error(response.status);
      }
      const da = await response.json();
      console.log("pfo:", da, employeeCrew);
      callback();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  useEffect(() => {
    if (cr.trim() !== "") {
      setEmplpyeeCrew(...data.filter((f) => f._id.crew === cr));
    }
  }, [data, cr]);

  console.log("crews hc", employeeCrew, datam);
  const prodHour = (d) => {
    let phs = 0;
    let em = 0;
    d.forEach((m) => {
      phs += (m.emb * m.dataref.finalAssembly) / 60;
      em += m.emb;
    });
    setPh(phs);
    setEmb(em);
  };
  const pah = calculateActualPaidHours(
    datam.length === 0
      ? employeeCrew === null
        ? []
        : employeeCrew.employees
      : employeeCrew === null
      ? [...datam]
      : [...employeeCrew.employees, ...datam]
  );
  const sendOutput = async (d) => {
    try {
      const body = {
        date: today,
        crew: employeeCrew._id.crew,
        shift: shift,
        output: d.map((m) => ({
          family: m.family,
          reference: m.ref,
          cuting: m.dataref.cuting,
          leadPrep: m.dataref.leadPrep,
          finalAssembly: m.dataref.finalAssembly,
          exigency: m.dataref.exigency,
          exig: m.exig,
          prod: m.prod,
          ce: m.ce,
          emb: m.emb,
          comment: m.cmmt,
        })),
      };
      console.log(body);
      const response = await fetch(`${api}/production-card/output/`, {
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
      setsuccess(true);
      return true;
    } catch (e) {
      console.error(e);
      setErr(true);
      return false;
    }
  };

  if (err) {
    setTimeout(() => {
      setErr(false);
    }, 2000);
  }
  if (success) {
    setTimeout(() => {
      setsuccess(false);
    }, 2000);
  }

  return (
    <div className={c.container}>
      {err && (
        <NetworkNotify message="We have encountered an error, please try it again!" />
      )}
      {success && (
        <NetworkNotify
          message="Data has been successfully sent"
          success={success}
        />
      )}
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
            onChange={(e) => setCr(e.value)}
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
            onChange={(e) => setShift(e.value)}
          />
        </div>
      </div>
      {employeeCrew === null || shift === null ? (
        <h4 className={c.noCrewS}>Please select crew and shift to proceed</h4>
      ) : (
        <React.Fragment>
          <div className={c.title}>
            <span></span>
            <h3>Crew details</h3>
            <span></span>
          </div>
          <div className={c.hcContainer}>
            <div className={c.data}>
              <h3>project</h3>
              <span>{employeeCrew._id.project}</span>
            </div>
            <div className={c.data}>
              <h3>family</h3>
              <span>{employeeCrew._id.family}</span>
            </div>
            <div className={c.data}>
              <h3>crew</h3>
              <span>{employeeCrew._id.crew}</span>
            </div>
            <div className={c.data}>
              <h3>coord mlle</h3>
              <span>{employeeCrew._id.coordinator}</span>
            </div>
            <div className={c.data}>
              <h3>coord name</h3>
              <span>{employeeCrew._id.coordinator_fullname}</span>
            </div>
            <div className={c.data}>
              <h3>sl mlle</h3>
              <span>{employeeCrew._id.shiftleader}</span>
            </div>
            <div className={c.data}>
              <h3>sl name</h3>
              <span>{employeeCrew._id.shiftleader_fullname}</span>
            </div>
            <div className={c.data}>
              <h3>tl mlle</h3>
              <span>{employeeCrew._id.teamleader}</span>
            </div>
          </div>
          <div className={c.title}>
            <span></span>
            <h3> statistics</h3>
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
              <span>
                {datam.length === 0
                  ? calculateActualHeadCount(
                      employeeCrew === null ? [] : employeeCrew.employees,
                      today
                    ).toFixed(1)
                  : calculateActualHeadCount(
                      employeeCrew === null
                        ? [...datam]
                        : [...employeeCrew.employees, ...datam],
                      today
                    ).toFixed(1)}
              </span>
            </div>
            <div className={c.data}>
              <h3>paid Hours</h3>
              <span>{pah.toFixed(2)}</span>
            </div>
            <div className={c.data}>
              <h3>prod hours</h3>
              <span>{ph.toFixed(2)}</span>
            </div>
            <div className={c.data}>
              <h3>WSD average</h3>
              <span>{emb === 0 ? 0 : ((ph / emb) * 60).toFixed(2)}</span>
            </div>
            <div className={c.data}>
              <h3>total EMB</h3>
              <span>{emb} </span>
            </div>
            <div className={c.data}>
              <h3>Efficiency</h3>
              <span>{pah === 0 ? 0 : ((ph / pah) * 100).toFixed(2)}%</span>
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
          {control === "pbc" && (
            <Pointing
              data={employeeCrew === null ? [] : employeeCrew.employees}
              postMultiEmpl={postMultiEmpl}
              today={today}
            />
          )}
          {control === "pbl" && (
            <PointingList
              data={employeeCrew === null ? [] : employeeCrew.employees}
              selectst={customStyles}
              singleEmpl={postSingleEmpl}
              multiEmpl={postMultiEmpl}
              today={today}
            />
          )}

          <div className={c.title2} style={{ marginBottom: "1rem" }}>
            <div className={c.line}></div>
            <h4>PROVISIONAL mutation</h4>
          </div>
          <PointingList
            data={datam}
            selectst={customStyles}
            singleEmpl={postSingleEmpl}
            multiEmpl={postMultiEmpl}
            today={today}
            pm={true}
          />
          <div className={c.title2}>
            <div className={c.line}></div>
            <h4>output</h4>
          </div>
          <Output
            prodHour={prodHour}
            sendOutput={sendOutput}
            datagetou={{
              date: today,
              crew: employeeCrew._id.crew,
              shift: shift,
            }}
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default Home;
