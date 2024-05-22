import { useSelector } from "react-redux";
import c from "./Output.module.css";
import { useCallback, useEffect, useState } from "react";
import api from "../../service/api";
import Select from "react-select";
import DropdownIndicator from "../UI/DropdownIndicator";
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

const Output = (p) => {
  const { isLoged } = useSelector((s) => s.login);
  const [data, setData] = useState([]);
  const [od, setOd] = useState([
    {
      id: 0,
      family: "",
      ref: "",
      exig: 0,
      prod: 0,
      ce: 0,
      emb: 0,
      cmmt: "",
    },
  ]);

  const callback = useCallback(async () => {
    try {
      const response = await fetch(`${api}/timelist`, {
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

      setData(d);
    } catch (e) {
      console.error(e);
    }
  }, [isLoged.token]);
  useEffect(() => {
    callback();
  }, [callback]);

  const onChangeHandler = (e, id, t) => {
    switch (t) {
      case "family":
        const datas = od;
        const i = od.findIndex((f) => f.id === id);
        datas[i].family = e.value;
        setOd(datas);
        break;
      case "admin":
        break;
      case "ab":
        break;
      default:
    }
  };


  const getListRef=d=>{
    
  }

  console.log("tlist", data, od);
  return (
    <div className={c.container}>
      <div className={c.pointingEmpl}>
        {od.map((m) => (
          <div className={c.poinHoldWraper}>
            <span
              className={c.close}
              onClick={(e) => setOd((p) => p.filter((f) => f.id !== m.id))}
            >
              ✖️
            </span>
            <div className={c.poinHold}>
              <span>Family</span>
              <Select
                components={{ DropdownIndicator }}
                options={data.map((m) => ({
                  label: m.family,
                  value: m.family,
                }))}
                id="multiSelect"
                inputId="shiftleader1"
                styles={customStyles}
                placeholder="select Family"
                onChange={(e) => onChangeHandler(e, m.id, "family")}
              />
            </div>

            <div className={c.poinHold}>
              <span>Reference</span>
              <Select
                components={{ DropdownIndicator }}
                options={[]}
                id="multiSelect"
                inputId="shiftleader1"
                styles={customStyles}
                placeholder="select Reference"
              />
            </div>

            <div className={c.poinHold}>
              <span>exig</span>
              <input type="number" placeholder="set exig" />
            </div>
            <div className={c.poinHold}>
              <span>Prod</span>
              <input type="number" placeholder="set Prod" />
            </div>
            <div className={c.poinHold}>
              <span>CE</span>
              <input type="number" placeholder="set CE" />
            </div>
            <div className={c.poinHold}>
              <span>EMB</span>
              <input type="number" placeholder="set EMB" />
            </div>
            <div className={c.poinHold}>
              <span>commantaire</span>
              <Select
                components={{ DropdownIndicator }}
                options={[
                  { label: "serie", value: "serie" },
                  { label: "mpr", value: "mpr" },
                ]}
                id="multiSelect"
                inputId="shiftleader1"
                styles={customStyles}
                placeholder="select commantaire"
              />
            </div>
          </div>
        ))}
        <div className={c.btnCn}>
          <button
            className={c.submitShi}
            style={{ color: "#f84018" }}
            onClick={(e) =>
              setOd((p) => [
                ...p,
                {
                  id: Math.random(),
                  family: "",
                  ref: "",
                  exig: 0,
                  prod: 0,
                  ce: 0,
                  emb: 0,
                  cmmt: "",
                },
              ])
            }
          >
            add
          </button>
          <button className={c.submitShi}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Output;
