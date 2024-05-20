import React, { useEffect, useState } from "react";
import c from "./PointingList.module.css";
import Select from "react-select";
import DropdownIndicator from "../UI/DropdownIndicator";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minWidth: "4rem",

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
    color: "#f3f3f3",
  }),
  singleValue: (p) => ({
    ...p,
    color: "black",
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

const PointingList = (p) => {
  const [dataList, setDataList] = useState(p.data);
  const [inputValue, setInputValue] = useState("");
  const [eid, setEid] = useState("");
  useEffect(() => {
    setDataList(p.data);
  }, [p.data]);
  // console.log(dataList, p.data);
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
                onClick={(e) => (eid === m._id ? setEid("") : setEid(m._id))}
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
                    <div className={c.poinHold} style={{ minWidth: "5rem" }}>
                      <span>Pointing</span>
                      <Select
                        components={{ DropdownIndicator }}
                        options={[
                          { label: "admin", value: "admin" },
                          { label: "shift", value: "shift" },
                          { label: "over time", value: "over time" },
                          { label: "ma", value: "ma" },
                          { label: "ctp", value: "ctp" },
                          { label: "ctn", value: "ctn" },
                          { label: "cr", value: "cr" },
                          { label: "t", value: "t" },
                          { label: "tl", value: "tl" },
                          { label: "retard", value: "retard" },
                          { label: "other", value: "other" },
                        ]}
                        id="multiSelect"
                        inputId="shiftleader1"
                        styles={customStyles}
                        placeholder="select shift"
                        isMulti
                      />
                    </div>
                    <div className={c.poinHold}>
                      <span>motif</span>
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
                    <div className={c.poinHold}>
                      <span>duration</span>
                      <input
                        type="number"
                        step={0.1}
                        placeholder="set duration"
                      />
                    </div>
                    <div className={c.poinHold}>
                      <span>Status</span>
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
