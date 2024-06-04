import React, { useCallback, useEffect, useState } from "react";
import c from "./PointingList.module.css";
import Select from "react-select";
import DropdownIndicator from "../UI/DropdownIndicator";
import CreatableSelect from "react-select/creatable";
import { isFriday, isSaturday } from "../hooks/daterelated";
import { useSelector } from "react-redux";
import api from "../../service/api";
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minWidth: "6rem",
    minHeight: "10px",
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
    color: "black",
    fontSize: "10px",
  }),
  singleValue: (p) => ({
    ...p,
    color: "black",
  }),
  menuList: (provided) => ({
    maxHeight: "70px",
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
const customStylesEXC = {
  control: (provided, state) => ({
    ...provided,
    minWidth: "15rem",
    minHeight: "10px",
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
    color: "black",
    fontSize: "10px",
  }),
  singleValue: (p) => ({
    ...p,
    color: "black",
  }),
  menuList: (provided) => ({
    maxHeight: "70px",
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

const PointingList = (p) => {
  const [dataList, setDataList] = useState(p.data);
  const [inputValue, setInputValue] = useState("");
  const [eid, setEid] = useState("");
  const [sae, setSea] = useState(false);
  const [poin, setpoin] = useState({
    status: "",
    pointing: "shift",
    pointingOptions: [],
    ctnDuration: 0,
    otDuration: 0,
    tDuration: 0,
    retardDuration: 0,
    crDuration: 0,
    ttl: "",
    tCrew: "",
    mutType: "",
    motif: "",
    details: "",
  });
  const [tom, setTom] = useState([
    {
      id: Math.random(),
      teamleader: "",
      crew: "",
      paidHour: 0,
    },
  ]);
  const [saePoin, setSaePoin] = useState({
    status: "",
    pointing: "shift",
    pointingOptions: [],
    ctnDuration: 0,
    otDuration: 0,
    tDuration: 0,
    crDuration: 0,
    retardDuration: 0,
    motif: "",
    details: "",
  });
  const [empExc, setEmpExc] = useState([]);
  const [dataEp, setDataEp] = useState([]);
  const { isLoged } = useSelector((s) => s.login);
  const callback = useCallback(async () => {
    try {
      const response = await fetch(`${api}/employee/crews-by-tl/`, {
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
      console.log("tl&crew:", d);
      setDataEp(d);
    } catch (e) {
      console.error(e);
    }
  }, [isLoged.token]);
  useEffect(() => {
    callback();
  }, [callback]);

  const filteredArray = p.data.filter((obj) => empExc.includes(obj.matricule));
  useEffect(() => {
    setDataList(p.data);
  }, [p.data]);

  const changeHandler = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputValue(value);
      if (e.target.value.trim() !== "") {
        setDataList(
          p.data.filter((obj) =>
            String(obj["matricule"]).includes(e.target.value)
          )
        );
      } else {
        setDataList(p.data);
      }
    }
  };

  const toogle = (e) => {
    setEid("");
    setpoin({
      status: "",
      pointing: "shift",
      pointingOptions: [],
      ctnDuration: 0,
      otDuration: 0,
      tDuration: 0,
      retardDuration: 0,
      crDuration: 0,
      ttl: "",
      tCrew: "",
      mutType: "",
      motif: "",
      details: "",
    });
    setTom([
      {
        id: Math.random(),
        teamleader: "",
        crew: "",
        paidHour: 0,
      },
    ]);
  };
  const toogleid = (e, t) => {
    setEid(t);
    console.log(
      dataList.filter((f) => f._id === t),
      t
    );
    const o = dataList.filter((f) => f._id === t)[0];
    setpoin({
      status: o.status === undefined ? "" : o.status,
      pointing: o.pointing === undefined ? "" : o.pointing,
      pointingOptions: o.pointingOptions === undefined ? [] : o.pointingOptions,
      ctnDuration: o.ctn === undefined ? 0 : o.ctn,
      otDuration: o.ot === undefined ? 0 : o.ot,
      tDuration: o.t === undefined ? 0 : o.t,
      crDuration: o.cr === undefined ? 0 : o.cr,
      retardDuration: o.retard === undefined ? 0 : o.retard,
      //todo: add ttl, and tcrew
      ttl: "",
      tCrew: "",
      mutType: "",
      motif: o.motif === undefined ? "" : o.motif,
      details: o.details === undefined ? "" : o.details,
    });
    setTom([
      {
        id: Math.random(),
        teamleader: "",
        crew: "",
        paidHour: 0,
      },
    ]);
  };

  const durt = (d) => {
    let dh = 0;
    d.map((m) => (dh += m.paidHour));
    return dh;
  };

  const submitSingleData = async (smt) => {
    let paidhour;
    switch (poin.pointing) {
      case "shift":
        if (isFriday(p.today)) {
          paidhour =
            7.58 -
            poin.tDuration -
            poin.retardDuration -
            poin.ctnDuration -
            durt(tom) -
            poin.crDuration +
            poin.otDuration;
        } else {
          paidhour =
            7.67 -
            poin.tDuration -
            poin.retardDuration -
            poin.ctnDuration -
            durt(tom) -
            poin.crDuration +
            poin.otDuration;
        }
        break;
      case "admin":
        if (isSaturday(p.today)) {
          paidhour =
            4 -
            poin.tDuration -
            poin.retardDuration -
            poin.ctnDuration -
            durt(tom) -
            poin.crDuration +
            poin.otDuration;
        } else {
          paidhour =
            8.17 -
            poin.tDuration -
            poin.retardDuration -
            poin.ctnDuration -
            durt(tom) -
            poin.crDuration +
            poin.otDuration;
        }
        break;
      case "ab":
      case "ap":
      case "ma":
      case "tl":
      case "ctp":
      case "mutation":
        paidhour = 0;
        break;
      default:
    }

    const f = await p.singleEmpl(poin, smt, paidhour, tom);
    if (f) {
      toogle();
    }
    console.log(poin, smt, paidhour, f);
  };

  const submitManyData = async () => {
    console.log(
      saePoin.tDuration,
      saePoin.retardDuration,
      saePoin.ctnDuration,
      saePoin.otDuration
    );
    let paidhour = 0;

    switch (saePoin.pointing) {
      case "shift":
        if (isFriday(p.today)) {
          paidhour =
            7.58 -
            saePoin.tDuration -
            saePoin.retardDuration -
            saePoin.ctnDuration -
            saePoin.crDuration +
            saePoin.otDuration;
        } else {
          paidhour =
            7.67 -
            saePoin.tDuration -
            saePoin.retardDuration -
            saePoin.ctnDuration -
            saePoin.crDuration +
            saePoin.otDuration;
        }
        break;
      case "admin":
        if (isSaturday(p.today)) {
          paidhour =
            4 -
            saePoin.tDuration -
            saePoin.retardDuration -
            saePoin.ctnDuration -
            saePoin.crDuration +
            saePoin.otDuration;
        } else {
          paidhour =
            8.17 -
            saePoin.tDuration -
            saePoin.retardDuration -
            saePoin.ctnDuration -
            saePoin.crDuration +
            saePoin.otDuration;
        }
        break;
      case "ab":
      case "ap":
      case "ma":
      case "tl":
      case "ctp":
      case "mutation":
        paidhour = 0;
        break;
      default:
    }

    const f = await p.multiEmpl(
      saePoin,
      p.data.filter((obj) => !empExc.includes(obj.matricule)),
      paidhour
    );
    if (f) {
      setSea(false);
      setEmpExc([]);
      setSaePoin({
        status: "",
        pointing: "",
        pointingOptions: [],
        ctnDuration: 0,
        otDuration: 0,
        tDuration: 0,
        retardDuration: 0,
        crDuration: 0,
        motif: "",
        details: "",
      });
    }
  };

  useEffect(() => {
    if (!poin.pointingOptions.includes("ctn")) {
      setpoin((p) => ({
        ...p,
        ctnDuration: 0,
      }));
    }
    if (!poin.pointingOptions.includes("ot")) {
      setpoin((p) => ({
        ...p,
        otDuration: 0,
      }));
    }
    if (!poin.pointingOptions.includes("t")) {
      setpoin((p) => ({
        ...p,
        tDuration: 0,
      }));
    }
    if (!poin.pointingOptions.includes("retard")) {
      setpoin((p) => ({
        ...p,
        retardDuration: 0,
      }));
    }
    if (!poin.pointingOptions.includes("cr")) {
      setpoin((p) => ({
        ...p,
        crDuration: 0,
      }));
    }
    if (!poin.pointingOptions.includes("mutation")) {
    }
    if (poin.pointing !== "mutation") {
      setpoin((p) => ({
        ...p,
        ttl: "",
        tCrew: "",
      }));
    }
  }, [poin.pointingOptions, poin.pointing]);

  const changetlm = (i, v) => {
    const ind = tom.findIndex((f) => f.id === i);
    console.log(ind);
    return ind;
  };

  console.log(tom);

  return (
    <div className={c.container}>
      {!p.pm && (
        <React.Fragment>
          <input
            type="number"
            placeholder="search by matricule"
            className={c.searchmlle}
            value={inputValue}
            onChange={changeHandler}
            pattern="[0-9]*"
          />
          <h4
            className={c.sae}
            onClick={(e) => {
              setSea(!sae);
              setEmpExc([]);
            }}
          >
            set all except
          </h4>
        </React.Fragment>
      )}
      {sae && (
        <div className={c.pointingEmpl} style={{ marginBottom: "1rem" }}>
          <div className={c.poinHoldWraper} style={{ flexDirection: "column" }}>
            <div className={c.poinHold}>
              <span>Pointing</span>
              <Select
                components={{ DropdownIndicator }}
                options={[
                  { label: "shift", value: "shift" },
                  { label: "admin", value: "admin" },
                  { label: "ctp", value: "ctp" },
                ]}
                id="multiSelect"
                inputId="shiftleader1"
                styles={customStylesEXC}
                placeholder="select shift"
                onChange={(e) =>
                  setSaePoin((p) => ({
                    ...p,
                    pointingOptions: [],
                    ctnDuration: 0,
                    otDuration: 0,
                    tDuration: 0,
                    retardDuration: 0,
                    crDuration: 0,
                    pointing: e.value,
                  }))
                }
                value={{ label: saePoin.pointing, value: saePoin.pointing }}
              />
            </div>
            {(saePoin.pointing === "shift" || saePoin.pointing === "admin") && (
              <div className={c.poinHold}>
                <span>Pointing exc</span>
                <Select
                  components={{ DropdownIndicator }}
                  options={[
                    { label: "ot", value: "ot" },
                    { label: "ctn", value: "ctn" },
                  ]}
                  id="multiSelect"
                  inputId="shiftleader1"
                  styles={customStylesEXC}
                  placeholder="select exc"
                  isMulti
                  value={saePoin.pointingOptions.map((m) => ({
                    label: m,
                    value: m,
                  }))}
                  onChange={(e) =>
                    setSaePoin((p) => ({
                      ...p,
                      pointingOptions: e.map((m) => m.value),
                    }))
                  }
                />
              </div>
            )}
            {saePoin.pointingOptions.includes("ctn") && (
              <div className={c.poinHold} style={{ width: "90%" }}>
                <span>ctn duration</span>
                <input
                  type="number"
                  step={0.1}
                  placeholder="set ctn duration"
                  style={{ width: "85%" }}
                  onChange={(e) =>
                    setSaePoin((p) => ({
                      ...p,
                      ctnDuration: +e.target.value / 60,
                    }))
                  }
                />
              </div>
            )}

            {saePoin.pointingOptions.includes("ot") && (
              <div className={c.poinHold} style={{ width: "90%" }}>
                <span>ot duration</span>
                <input
                  type="number"
                  step={0.1}
                  placeholder="set ot duration"
                  style={{ width: "85%" }}
                  onChange={(e) =>
                    setSaePoin((p) => ({
                      ...p,
                      otDuration: +e.target.value / 60,
                    }))
                  }
                />
              </div>
            )}
            {(saePoin.pointingOptions.includes("ctn") ||
              saePoin.pointing.includes("ctp")) && (
              <React.Fragment>
                <div className={c.poinHold}>
                  <span>motif</span>
                  <Select
                    components={{ DropdownIndicator }}
                    options={[
                      { label: "backup", value: "backup" },
                      { label: "fe", value: "fe" },
                      { label: "inapt", value: "inapt" },
                      { label: "planning", value: "planning" },
                      { label: "rm", value: "rm" },
                      { label: "others", value: "others" },
                    ]}
                    id="multiSelect"
                    inputId="shiftleader1"
                    styles={customStylesEXC}
                    placeholder="select motif"
                    onChange={(e) =>
                      setSaePoin((p) => ({
                        ...p,
                        motif: e.value,
                      }))
                    }
                  />
                </div>
                <div className={c.poinHold}>
                  <span>details</span>
                  <CreatableSelect
                    isClearable
                    components={{ DropdownIndicator }}
                    options={[
                      { label: "exit", value: "exit" },
                      { label: "backup", value: "backup" },
                      { label: "fe", value: "fe" },
                      { label: "night", value: "night" },
                      { label: "illness", value: "illness" },
                      { label: "cs", value: "cs" },
                    ]}
                    id="multiSelect"
                    inputId="shiftleader1"
                    styles={customStylesEXC}
                    placeholder="select details"
                    onChange={(e) =>
                      setSaePoin((p) => ({
                        ...p,
                        details: e.value,
                      }))
                    }
                  />
                </div>
              </React.Fragment>
            )}
          </div>
          <div className={c.poinHold} style={{ width: "90%" }}>
            <span>Except matricule</span>
            <Select
              components={{ DropdownIndicator }}
              options={p.data.map((m) => ({
                label: m.matricule,
                value: m.matricule,
              }))}
              id="multiSelect"
              inputId="shiftleader1"
              styles={customStylesEXC}
              placeholder="select exception"
              onChange={(e) => setEmpExc(e.map((m) => m.value))}
              isMulti
            />
          </div>
          {filteredArray.length > 0 && (
            <div style={{ width: "100%" }}>
              <div className={c.trainingH}>
                <div
                  className={c.trainingDi}
                  style={{ backgroundColor: "#E5E1DA" }}
                >
                  <div className={c.dataT} style={{ width: "33%" }}>
                    <h3>mlle</h3>
                  </div>
                  <div className={c.dataT} style={{ width: "33%" }}>
                    <h3>poste</h3>
                  </div>
                  <div className={c.dataT} style={{ width: "33%" }}>
                    <h3>Pointing</h3>
                  </div>
                </div>
                <div
                  className={c.trainingD}
                  style={{ backgroundColor: "#E5E1DA" }}
                >
                  <div className={c.dataT} style={{ width: "50%" }}>
                    <h3 style={{ color: "black" }}>hours</h3>
                  </div>
                  <div className={c.dataT} style={{ width: "50%" }}>
                    <h3 style={{ color: "black" }}>status</h3>
                  </div>
                </div>
              </div>
              <div className={c.wraper} style={{ width: "100%" }}>
                <React.Fragment>
                  {filteredArray.map((m) => (
                    <React.Fragment key={m._id}>
                      <div
                        className={c.trainingH}
                        key={m._id}
                        onClick={(e) =>
                          eid === m._id ? toogle() : toogleid(e, m._id)
                        }
                      >
                        <div className={c.trainingD}>
                          <div className={c.dataT} style={{ width: "33%" }}>
                            <h3>{m.matricule}</h3>
                          </div>
                          <div className={c.dataT} style={{ width: "33%" }}>
                            <h3>{m.poste}</h3>
                          </div>
                          <div className={c.dataT} style={{ width: "33%" }}>
                            <h3>
                              {m.pointing === undefined ? "none" : m.pointing}
                            </h3>
                          </div>
                        </div>
                        <div className={c.trainingDi}>
                          <div className={c.dataT} style={{ width: "50%" }}>
                            <h3>
                              {m.paidHour === undefined
                                ? 0
                                : m.paidHour.toFixed(2)}
                            </h3>
                          </div>
                          <div className={c.dataT} style={{ width: "50%" }}>
                            <h3>{m.status}</h3>
                          </div>
                        </div>
                      </div>
                      {eid === m._id && (
                        <div className={c.pointingEmpl}>
                          <div className={c.poinHoldWraper}>
                            <div className={c.poinHold}>
                              <span>Pointing</span>
                              <Select
                                components={{ DropdownIndicator }}
                                options={[
                                  { label: "shift", value: "shift" },
                                  { label: "admin", value: "admin" },
                                  { label: "ab", value: "ab" },
                                  { label: "ap", value: "ap" },
                                  { label: "ma", value: "ma" },
                                  { label: "tl", value: "tl" },
                                  { label: "ctp", value: "ctp" },
                                  { label: "mutation", value: "mutation" },
                                ]}
                                id="multiSelect"
                                inputId="shiftleader1"
                                styles={customStyles}
                                placeholder="select shift"
                                onChange={(e) =>
                                  setpoin((p) => ({
                                    ...p,
                                    pointingOptions: [],
                                    ctnDuration: 0,
                                    otDuration: 0,
                                    tDuration: 0,
                                    retardDuration: 0,
                                    crDuration: 0,
                                    pointing: e.value,
                                  }))
                                }
                                value={{
                                  label: poin.pointing,
                                  value: poin.pointing,
                                }}
                              />
                            </div>
                            {poin.pointing === "mutation" && (
                              <React.Fragment>
                                <div className={c.poinHold}>
                                  <span>targeted tl</span>
                                  <Select
                                    components={{ DropdownIndicator }}
                                    options={dataEp.map((m) => ({
                                      label: m.tl.fullname,
                                      value: m.tl.username,
                                    }))}
                                    id="multiSelect"
                                    inputId="shiftleader1"
                                    styles={customStyles}
                                    placeholder="select teamleader"
                                    onChange={(e) =>
                                      setpoin((p) => ({ ...p, ttl: e.value }))
                                    }
                                    // value={{
                                    //   label: poin.ttl,
                                    //   value: poin.ttl,
                                    // }}
                                  />
                                </div>
                                {poin.ttl.trim() !== "" && (
                                  <div className={c.poinHold}>
                                    <span>targeted crew</span>
                                    <Select
                                      components={{ DropdownIndicator }}
                                      options={dataEp
                                        .filter(
                                          (f) => f.tl.username === poin.ttl
                                        )[0]
                                        .crews.map((m) => ({
                                          label: m,
                                          value: m,
                                        }))}
                                      id="multiSelect"
                                      inputId="shiftleader1"
                                      styles={customStyles}
                                      placeholder="select crew"
                                      onChange={(e) =>
                                        setpoin((p) => ({
                                          ...p,
                                          tCrew: e.value,
                                        }))
                                      }
                                    />
                                  </div>
                                )}
                                <div className={c.poinHold}>
                                  <span>mutation type</span>
                                  <Select
                                    components={{ DropdownIndicator }}
                                    options={[
                                      {
                                        label: "temporelle",
                                        value: "temporelle",
                                      },
                                      {
                                        label: "Définitivement",
                                        value: "Définitivement",
                                      },
                                    ]}
                                    id="multiSelect"
                                    inputId="shiftleader1"
                                    styles={customStyles}
                                    placeholder="select type"
                                    onChange={(e) =>
                                      setpoin((p) => ({
                                        ...p,
                                        mutType: e.value,
                                      }))
                                    }
                                    // value={{
                                    //   label: poin.ttl,
                                    //   value: poin.ttl,
                                    // }}
                                  />
                                </div>
                              </React.Fragment>
                            )}
                            {(poin.pointing === "shift" ||
                              poin.pointing === "admin") && (
                              <div className={c.poinHold}>
                                <span>Pointing exc</span>
                                <Select
                                  components={{ DropdownIndicator }}
                                  options={[
                                    { label: "ot", value: "ot" },
                                    { label: "ctn", value: "ctn" },
                                    { label: "cr", value: "cr" },
                                    { label: "t", value: "t" },
                                    { label: "retard", value: "retard" },
                                    { label: "mutation", value: "mutation" },
                                  ]}
                                  id="multiSelect"
                                  inputId="shiftleader1"
                                  styles={customStyles}
                                  placeholder="select exc"
                                  isMulti
                                  value={poin.pointingOptions.map((m) => ({
                                    label: m,
                                    value: m,
                                  }))}
                                  onChange={(e) =>
                                    setpoin((p) => ({
                                      ...p,
                                      pointingOptions: e.map((m) => m.value),
                                    }))
                                  }
                                />
                              </div>
                            )}

                            {poin.pointingOptions.includes("ctn") && (
                              <div className={c.poinHold}>
                                <span>ctn duration</span>
                                <input
                                  type="number"
                                  placeholder="set ctn duration"
                                  onChange={(e) =>
                                    setpoin((p) => ({
                                      ...p,
                                      ctnDuration: +e.target.value / 60,
                                    }))
                                  }
                                  value={poin.ctnDuration * 60}
                                />
                              </div>
                            )}
                            {poin.pointingOptions.includes("retard") && (
                              <div className={c.poinHold}>
                                <span>retard duration</span>
                                <input
                                  type="number"
                                  placeholder="set retard duration"
                                  onChange={(e) =>
                                    setpoin((p) => ({
                                      ...p,
                                      retardDuration: +e.target.value / 60,
                                    }))
                                  }
                                  value={poin.retardDuration * 60}
                                />
                              </div>
                            )}
                            {poin.pointingOptions.includes("t") && (
                              <div className={c.poinHold}>
                                <span>t duration</span>
                                <input
                                  type="number"
                                  placeholder="set t duration"
                                  onChange={(e) =>
                                    setpoin((p) => ({
                                      ...p,
                                      tDuration: +e.target.value / 60,
                                    }))
                                  }
                                  value={poin.tDuration * 60}
                                />
                              </div>
                            )}
                            {poin.pointingOptions.includes("cr") && (
                              <div className={c.poinHold}>
                                <span>cr duration</span>
                                <input
                                  type="number"
                                  placeholder="set cr duration"
                                  onChange={(e) =>
                                    setpoin((p) => ({
                                      ...p,
                                      crDuration: +e.target.value / 60,
                                    }))
                                  }
                                  value={poin.crDuration * 60}
                                />
                              </div>
                            )}
                            {poin.pointingOptions.includes("ot") && (
                              <div className={c.poinHold}>
                                <span>ot duration</span>
                                <input
                                  type="number"
                                  placeholder="set ot duration"
                                  onChange={(e) =>
                                    setpoin((p) => ({
                                      ...p,
                                      otDuration: +e.target.value / 60,
                                    }))
                                  }
                                  value={poin.otDuration * 60}
                                />
                              </div>
                            )}
                            {(poin.pointingOptions.includes("ctn") ||
                              poin.pointing === "ctp") && (
                              <React.Fragment>
                                <div className={c.poinHold}>
                                  <span>motif</span>
                                  <Select
                                    components={{ DropdownIndicator }}
                                    options={[
                                      { label: "backup", value: "backup" },
                                      { label: "fe", value: "fe" },
                                      { label: "inapt", value: "inapt" },
                                      { label: "planning", value: "planning" },
                                      { label: "rm", value: "rm" },
                                      { label: "others", value: "others" },
                                    ]}
                                    id="multiSelect"
                                    inputId="shiftleader1"
                                    styles={customStyles}
                                    placeholder="select motif"
                                    onChange={(e) =>
                                      setpoin((p) => ({ ...p, motif: e.value }))
                                    }
                                    value={{
                                      label: poin.motif,
                                      value: poin.motif,
                                    }}
                                  />
                                </div>
                                <div className={c.poinHold}>
                                  <span>details</span>
                                  <CreatableSelect
                                    isClearable
                                    components={{ DropdownIndicator }}
                                    options={[
                                      { label: "exit", value: "exit" },
                                      { label: "backup", value: "backup" },
                                      { label: "fe", value: "fe" },
                                      { label: "night", value: "night" },
                                      { label: "illness", value: "illness" },
                                      { label: "cs", value: "cs" },
                                    ]}
                                    id="multiSelect"
                                    inputId="shiftleader1"
                                    styles={customStyles}
                                    placeholder="select details"
                                    onChange={(e) =>
                                      setpoin((p) => ({
                                        ...p,
                                        details: e === null ? "" : e.value,
                                      }))
                                    }
                                    value={{
                                      label: poin.details,
                                      value: poin.details,
                                    }}
                                  />
                                </div>
                              </React.Fragment>
                            )}
                            <div className={c.poinHold}>
                              <span>Status</span>
                              <Select
                                components={{ DropdownIndicator }}
                                options={[
                                  { label: "none", value: "" },
                                  {
                                    label: "Maladie Long",
                                    value: "Maladie Long",
                                  },
                                  { label: "Descipline", value: "Descipline" },
                                  { label: "Inapt", value: "Inapt" },
                                  { label: "Inapt Nuit", value: "Inapt Nuit" },
                                  { label: "Inapt 12H", value: "Inapt 12H" },
                                  {
                                    label: "Allaitement",
                                    value: "Allaitement",
                                  },
                                  { label: "MT", value: "MT" },
                                  { label: "Enceinte", value: "Enceinte" },
                                  {
                                    label: "New Operator",
                                    value: "New Operator",
                                  },
                                ]}
                                id="multiSelect"
                                inputId="shiftleader1"
                                styles={customStyles}
                                placeholder="select shift"
                                onChange={(e) =>
                                  setpoin((p) => ({ ...p, status: e.value }))
                                }
                                value={{
                                  label: poin.status,
                                  value: poin.status,
                                }}
                              />
                            </div>
                          </div>
                          <button
                            className={c.submitShi}
                            onClick={(e) => submitSingleData(m.matricule)}
                          >
                            Submit
                          </button>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              </div>
            </div>
          )}
          <div style={{ width: "fit-content", marginLeft: "auto" }}>
            <button
              className={c.submitShi}
              onClick={(e) => {
                setSea(false);
                setEmpExc([]);
                setSaePoin({
                  status: "",
                  pointing: "",
                  pointingOptions: [],
                  ctnDuration: 0,
                  otDuration: 0,
                  tDuration: 0,
                  crDuration: 0,
                  retardDuration: 0,
                  motif: "",
                  details: "",
                });
              }}
            >
              cancel
            </button>
            <button className={c.submitShi} onClick={submitManyData}>
              Submit
            </button>
          </div>
        </div>
      )}
      {!sae && (
        <React.Fragment>
          <div className={c.trainingH}>
            <div
              className={c.trainingDi}
              style={{ backgroundColor: "#E5E1DA" }}
            >
              <div className={c.dataT} style={{ width: "33%" }}>
                <h3>mlle</h3>
              </div>
              <div className={c.dataT} style={{ width: "33%" }}>
                <h3>poste</h3>
              </div>
              <div className={c.dataT} style={{ width: "33%" }}>
                <h3>Pointing</h3>
              </div>
            </div>
            <div className={c.trainingD} style={{ backgroundColor: "#E5E1DA" }}>
              <div className={c.dataT} style={{ width: "50%" }}>
                <h3 style={{ color: "black" }}>hours</h3>
              </div>
              <div className={c.dataT} style={{ width: "50%" }}>
                <h3 style={{ color: "black" }}>status</h3>
              </div>
            </div>
          </div>
          <div className={c.wraper}>
            {dataList.length > 0 ? (
              dataList.map((m, i) => (
                <React.Fragment key={m._id}>
                  <div
                    className={c.trainingH}
                    key={i}
                    onClick={(e) =>
                      eid === m._id ? toogle() : toogleid(e, m._id)
                    }
                  >
                    <div className={c.trainingD}>
                      <div className={c.dataT} style={{ width: "33%" }}>
                        <h3>{m.matricule}</h3>
                      </div>
                      <div className={c.dataT} style={{ width: "33%" }}>
                        <h3>{m.poste}</h3>
                      </div>
                      <div className={c.dataT} style={{ width: "33%" }}>
                        <h3>
                          {m.pointing === undefined ? "none" : m.pointing}
                        </h3>
                      </div>
                    </div>
                    <div className={c.trainingDi}>
                      <div className={c.dataT} style={{ width: "50%" }}>
                        <h3>
                          {m.paidHour === undefined ? 0 : m.paidHour.toFixed(2)}
                        </h3>
                      </div>
                      <div className={c.dataT} style={{ width: "50%" }}>
                        <h3>{m.status}</h3>
                      </div>
                    </div>
                  </div>
                  {eid === m._id && (
                    <div className={c.pointingEmpl} key={m._id}>
                      <div className={c.poinHoldWraper}>
                        <div className={c.poinHold}>
                          <span>Pointing</span>
                          <Select
                            components={{ DropdownIndicator }}
                            options={[
                              { label: "shift", value: "shift" },
                              { label: "admin", value: "admin" },
                              { label: "ab", value: "ab" },
                              { label: "ap", value: "ap" },
                              { label: "ma", value: "ma" },
                              { label: "tl", value: "tl" },
                              { label: "ctp", value: "ctp" },
                              { label: "mutation", value: "mutation" },
                            ]}
                            id="multiSelect"
                            inputId="shiftleader1"
                            styles={customStyles}
                            placeholder="select shift"
                            onChange={(e) =>
                              setpoin((p) => ({
                                ...p,
                                pointingOptions: [],
                                ctnDuration: 0,
                                otDuration: 0,
                                tDuration: 0,
                                retardDuration: 0,
                                crDuration: 0,
                                pointing: e.value,
                              }))
                            }
                            value={{
                              label: poin.pointing,
                              value: poin.pointing,
                            }}
                          />
                        </div>
                        {(poin.pointing === "shift" ||
                          poin.pointing === "admin") && (
                          <div className={c.poinHold}>
                            <span>Pointing exc</span>
                            <Select
                              components={{ DropdownIndicator }}
                              options={[
                                { label: "ot", value: "ot" },
                                { label: "ctn", value: "ctn" },
                                { label: "cr", value: "cr" },
                                { label: "t", value: "t" },
                                { label: "retard", value: "retard" },
                                { label: "mutation", value: "mutation" },
                              ]}
                              id="multiSelect"
                              inputId="shiftleader1"
                              styles={customStyles}
                              placeholder="select exc"
                              isMulti
                              value={poin.pointingOptions.map((m) => ({
                                label: m,
                                value: m,
                              }))}
                              onChange={(e) =>
                                setpoin((p) => ({
                                  ...p,
                                  pointingOptions: e.map((m) => m.value),
                                }))
                              }
                            />
                          </div>
                        )}
                        {poin.pointingOptions.includes("ctn") && (
                          <div className={c.poinHold}>
                            <span>ctn duration</span>
                            <input
                              type="number"
                              placeholder="set ctn duration"
                              onChange={(e) =>
                                setpoin((p) => ({
                                  ...p,
                                  ctnDuration: +e.target.value / 60,
                                }))
                              }
                              value={poin.ctnDuration * 60}
                            />
                          </div>
                        )}
                        {poin.pointingOptions.includes("retard") && (
                          <div className={c.poinHold}>
                            <span>retard duration</span>
                            <input
                              type="number"
                              placeholder="set retard duration"
                              onChange={(e) =>
                                setpoin((p) => ({
                                  ...p,
                                  retardDuration: +e.target.value / 60,
                                }))
                              }
                              value={poin.retardDuration * 60}
                            />
                          </div>
                        )}
                        {poin.pointingOptions.includes("t") && (
                          <div className={c.poinHold}>
                            <span>t duration</span>
                            <input
                              type="number"
                              placeholder="set t duration"
                              onChange={(e) =>
                                setpoin((p) => ({
                                  ...p,
                                  tDuration: +e.target.value / 60,
                                }))
                              }
                              value={poin.tDuration * 60}
                            />
                          </div>
                        )}
                        {poin.pointingOptions.includes("ot") && (
                          <div className={c.poinHold}>
                            <span>ot duration</span>
                            <input
                              type="number"
                              placeholder="set ot duration"
                              onChange={(e) =>
                                setpoin((p) => ({
                                  ...p,
                                  otDuration: +e.target.value / 60,
                                }))
                              }
                              value={poin.otDuration * 60}
                            />
                          </div>
                        )}
                        {poin.pointingOptions.includes("cr") && (
                          <div className={c.poinHold}>
                            <span>cr duration</span>
                            <input
                              type="number"
                              placeholder="set cr duration"
                              onChange={(e) =>
                                setpoin((p) => ({
                                  ...p,
                                  crDuration: +e.target.value / 60,
                                }))
                              }
                              value={poin.crDuration * 60}
                            />
                          </div>
                        )}
                        {(poin.pointingOptions.includes("ctn") ||
                          poin.pointing === "ctp") && (
                          <React.Fragment>
                            <div className={c.poinHold}>
                              <span>motif</span>
                              <Select
                                components={{ DropdownIndicator }}
                                options={[
                                  { label: "backup", value: "backup" },
                                  { label: "fe", value: "fe" },
                                  { label: "inapt", value: "inapt" },
                                  { label: "planning", value: "planning" },
                                  { label: "rm", value: "rm" },
                                  { label: "others", value: "others" },
                                ]}
                                id="multiSelect"
                                inputId="shiftleader1"
                                styles={customStyles}
                                placeholder="select motif"
                                onChange={(e) =>
                                  setpoin((p) => ({ ...p, motif: e.value }))
                                }
                                value={{
                                  label: poin.motif,
                                  value: poin.motif,
                                }}
                              />
                            </div>
                            <div className={c.poinHold}>
                              <span>details</span>
                              <CreatableSelect
                                isClearable
                                components={{ DropdownIndicator }}
                                options={[
                                  { label: "exit", value: "exit" },
                                  { label: "backup", value: "backup" },
                                  { label: "fe", value: "fe" },
                                  { label: "night", value: "night" },
                                  { label: "illness", value: "illness" },
                                  { label: "cs", value: "cs" },
                                ]}
                                id="multiSelect"
                                inputId="shiftleader1"
                                styles={customStyles}
                                placeholder="select details"
                                onChange={(e) =>
                                  setpoin((p) => ({
                                    ...p,
                                    details: e === null ? "" : e.value,
                                  }))
                                }
                                value={{
                                  label: poin.details,
                                  value: poin.details,
                                }}
                              />
                            </div>
                          </React.Fragment>
                        )}
                        {poin.pointing === "mutation" && (
                          <React.Fragment>
                            <div className={c.poinHold}>
                              <span>targeted tl</span>
                              <Select
                                components={{ DropdownIndicator }}
                                options={dataEp.map((m) => ({
                                  label: m.tl.fullname,
                                  value: m.tl.username,
                                }))}
                                id="multiSelect"
                                inputId="shiftleader1"
                                styles={customStyles}
                                placeholder="select teamleader"
                                onChange={(e) =>
                                  setpoin((p) => ({ ...p, ttl: e.value }))
                                }
                              />
                            </div>
                            {poin.ttl.trim() !== "" && (
                              <div className={c.poinHold}>
                                <span>targeted crew</span>
                                <Select
                                  components={{ DropdownIndicator }}
                                  options={dataEp
                                    .filter(
                                      (f) => f.tl.username === poin.ttl
                                    )[0]
                                    .crews.map((m) => ({
                                      label: m,
                                      value: m,
                                    }))}
                                  id="multiSelect"
                                  inputId="shiftleader1"
                                  styles={customStyles}
                                  placeholder="select crew"
                                  onChange={(e) =>
                                    setpoin((p) => ({
                                      ...p,
                                      tCrew: e.value,
                                    }))
                                  }
                                />
                              </div>
                            )}
                            <div className={c.poinHold}>
                              <span>mutation type</span>
                              <Select
                                components={{ DropdownIndicator }}
                                options={[
                                  { label: "temporelle", value: "temporelle" },
                                  {
                                    label: "Définitivement",
                                    value: "Définitivement",
                                  },
                                ]}
                                id="multiSelect"
                                inputId="shiftleader1"
                                styles={customStyles}
                                placeholder="select type"
                                onChange={(e) =>
                                  setpoin((p) => ({ ...p, mutType: e.value }))
                                }
                              />
                            </div>
                          </React.Fragment>
                        )}
                        {poin.pointingOptions.includes("mutation") && (
                          <div className={c.mutexpx}>
                            {tom.map((m) => (
                              <div className={c.tomwrap} key={m.id}>
                                <div className={c.poinHold}>
                                  <span>targeted tl</span>
                                  <Select
                                    components={{ DropdownIndicator }}
                                    options={dataEp.map((m) => ({
                                      label: m.tl.fullname,
                                      value: m.tl.username,
                                    }))}
                                    id="multiSelect"
                                    inputId="shiftleader1"
                                    styles={customStyles}
                                    placeholder="select teamleader"
                                    onChange={(e) => {
                                      setTom((p) => {
                                        return p.map((item, ind) => {
                                          if (changetlm(m.id) === ind) {
                                            return {
                                              ...item,
                                              teamleader: e.value,
                                            };
                                          }
                                          return item;
                                        });
                                      });
                                    }}
                                    // value={{
                                    //   label: poin.ttl,
                                    //   value: poin.ttl,
                                    // }}
                                  />
                                </div>
                                {tom[changetlm(m.id)].teamleader.trim() !==
                                  "" && (
                                  <React.Fragment>
                                    <div className={c.poinHold}>
                                      <span>targeted crew</span>
                                      <Select
                                        components={{ DropdownIndicator }}
                                        options={dataEp
                                          .filter(
                                            (f) =>
                                              f.tl.username ===
                                              tom[changetlm(m.id)].teamleader
                                          )[0]
                                          .crews.map((m) => ({
                                            label: m,
                                            value: m,
                                          }))}
                                        id="multiSelect"
                                        inputId="shiftleader1"
                                        styles={customStyles}
                                        placeholder="select crew"
                                        onChange={(e) => {
                                          setTom((p) => {
                                            return p.map((item, ind) => {
                                              if (changetlm(m.id) === ind) {
                                                return {
                                                  ...item,
                                                  crew: e.value,
                                                };
                                              }
                                              return item;
                                            });
                                          });
                                        }}
                                      />
                                    </div>
                                    <div className={c.poinHold}>
                                      <span>duration</span>
                                      <input
                                        type="number"
                                        placeholder="set duration"
                                        onChange={(e) => {
                                          setTom((p) => {
                                            return p.map((item, ind) => {
                                              if (changetlm(m.id) === ind) {
                                                return {
                                                  ...item,
                                                  paidHour:
                                                    +e.target.value / 60,
                                                };
                                              }
                                              return item;
                                            });
                                          });
                                        }}
                                      />
                                    </div>
                                  </React.Fragment>
                                )}
                              </div>
                            ))}
                            <h5
                              className={c.addnewinputs}
                              onClick={(e) =>
                                setTom((p) => [
                                  ...p,
                                  {
                                    id: Math.random(),
                                    teamleader: "",
                                    crew: "",
                                    paidHour: 0,
                                  },
                                ])
                              }
                            >
                              add new teamleader
                            </h5>
                          </div>
                        )}
                        <div className={c.poinHold}>
                          <span>Status</span>
                          <Select
                            components={{ DropdownIndicator }}
                            options={[
                              { label: "none", value: "" },
                              { label: "Maladie Long", value: "Maladie Long" },
                              { label: "Descipline", value: "Descipline" },
                              { label: "Inapt", value: "Inapt" },
                              { label: "Inapt Nuit", value: "Inapt Nuit" },
                              { label: "Inapt 12H", value: "Inapt 12H" },
                              { label: "Allaitement", value: "Allaitement" },
                              { label: "MT", value: "MT" },
                              { label: "Enceinte", value: "Enceinte" },
                              { label: "New Operator", value: "New Operator" },
                            ]}
                            id="multiSelect"
                            inputId="shiftleader1"
                            styles={customStyles}
                            placeholder="select shift"
                            onChange={(e) =>
                              setpoin((p) => ({ ...p, status: e.value }))
                            }
                            value={{
                              label: poin.status,
                              value: poin.status,
                            }}
                          />
                        </div>
                      </div>
                      <button
                        className={c.submitShi}
                        onClick={(e) => submitSingleData(m.matricule)}
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </React.Fragment>
              ))
            ) : (
              <h4 className={c.noCrewS}>No employees were found</h4>
            )}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default PointingList;
