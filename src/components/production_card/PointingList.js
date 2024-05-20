import React, { useEffect, useState } from "react";
import c from "./PointingList.module.css";
import Select from "react-select";
import DropdownIndicator from "../UI/DropdownIndicator";
import CreatableSelect from "react-select/creatable";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minWidth: "6rem",
    minHeight: "10px",
    fontSize: "8px",
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
  const [poin, setpoin] = useState({
    status: "",
    pointing: "shift",
    pointingOptions: [],
    ctnDuration: 0,
    otDuration: 0,
    tDuration: 0,
    retardDuration: 0,
    motif: "",
    details: "",
  });
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
      motif: "",
      details: "",
    });
  };
  const toogleid = (e, t) => {
    setEid(t);
    setpoin({
      status: "",
      pointing: "shift",
      pointingOptions: [],
      ctnDuration: 0,
      otDuration: 0,
      tDuration: 0,
      retardDuration: 0,
      motif: "",
      details: "",
    });
  };

  console.log(poin);
  return (
    <div className={c.container}>
      <input
        type="number"
        placeholder="search by matricule"
        className={c.searchmlle}
        value={inputValue}
        onChange={changeHandler}
        pattern="[0-9]*"
      />
      <div className={c.trainingH}>
        <div className={c.trainingDi} style={{ backgroundColor: "#E5E1DA" }}>
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
          dataList.map((m) => (
            <React.Fragment>
              <div
                className={c.trainingH}
                key={m._id}
                onClick={(e) => (eid === m._id ? toogle() : toogleid(e, m._id))}
              >
                <div className={c.trainingD}>
                  <div className={c.dataT} style={{ width: "33%" }}>
                    <h3>{m.matricule}</h3>
                  </div>
                  <div className={c.dataT} style={{ width: "33%" }}>
                    <h3>{m.poste}</h3>
                  </div>
                  <div className={c.dataT} style={{ width: "33%" }}>
                    <h3>shift</h3>
                  </div>
                </div>
                <div className={c.trainingDi}>
                  <div className={c.dataT} style={{ width: "50%" }}>
                    <h3>7.67</h3>
                  </div>
                  <div className={c.dataT} style={{ width: "50%" }}>
                    <h3>none</h3>
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
                          { label: "ma", value: "ma" },
                          { label: "tl", value: "tl" },
                          { label: "ctp", value: "ctp" },
                        ]}
                        id="multiSelect"
                        inputId="shiftleader1"
                        styles={customStyles}
                        placeholder="select shift"
                        onChange={(e) =>
                          setpoin((p) => ({ ...p, pointing: e.value }))
                        }
                        value={{ label: poin.pointing, value: poin.pointing }}
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
                            { label: "other", value: "other" },
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
                          step={0.1}
                          placeholder="set ctn duration"
                        />
                      </div>
                    )}
                    {poin.pointingOptions.includes("retard") && (
                      <div className={c.poinHold}>
                        <span>retard duration</span>
                        <input
                          type="number"
                          step={0.1}
                          placeholder="set retard duration"
                        />
                      </div>
                    )}
                    {poin.pointingOptions.includes("t") && (
                      <div className={c.poinHold}>
                        <span>t duration</span>
                        <input
                          type="number"
                          step={0.1}
                          placeholder="set t duration"
                        />
                      </div>
                    )}
                    {poin.pointingOptions.includes("ot") && (
                      <div className={c.poinHold}>
                        <span>ot duration</span>
                        <input
                          type="number"
                          step={0.1}
                          placeholder="set ot duration"
                        />
                      </div>
                    )}
                    {(poin.pointingOptions.includes("ctn") ||
                      poin.pointingOptions.includes("ctp")) && (
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
                          />
                        </div>
                      </React.Fragment>
                    )}
                    <div className={c.poinHold}>
                      <span>Status</span>
                      <Select
                        components={{ DropdownIndicator }}
                        options={[
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
                      />
                    </div>
                  </div>
                  <button className={c.submitShi}>Submit</button>
                </div>
              )}
            </React.Fragment>
          ))
        ) : (
          <h4 className={c.noCrewS}>No employees were found</h4>
        )}
      </div>
    </div>
  );
};

export default PointingList;
