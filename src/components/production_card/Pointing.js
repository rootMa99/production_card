import React, { useState } from "react";
import c from "./Pointing.module.css";
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


const Pointing = (p) => {
  const [pc, setPc] = useState(false);
  const [typet, setTypet] = useState({
    t: "",
    title: "",
  });
  const onClickHandler = (e, t) => {
    setPc(true);
    switch (t) {
      case "ab":
        setTypet({
          t: t,
          title: "ABSENT",
        });
        break;
      case "ad":
        setTypet({
          t: t,
          title: "admin",
        });
        break;
      case "ot":
        setTypet({
          t: t,
          title: "ot",
        });
        break;
      case "ma":
        setTypet({
          t: t,
          title: "maladie",
        });
        break;
      case "ctp":
        setTypet({
          t: t,
          title: "ctp",
        });
        break;
      case "ctn":
        setTypet({
          t: t,
          title: "ctn",
        });
        break;
      case "cr":
        setTypet({
          t: t,
          title: "cr",
        });
        break;
      case "t":
        setTypet({
          t: t,
          title: "autorisation",
        });
        break;
      case "tl":
        setTypet({
          t: t,
          title: "autorisation légal",
        });
        break;
      case "retard":
        setTypet({
          t: t,
          title: "retard",
        });
        break;
      case "other":
        setTypet({
          t: t,
          title: "other",
        });
        break;
      default:
    }
  };
  console.log(pc);

  return (
    <div className={c.container}>
      {pc && (
        <div className={c.pointingEmpl}>
          <h3>{typet.title}</h3>
          <div className={c.poinHoldWraper}>
          <div className={c.poinHold}>
              <span>Family</span>
              <Select
                components={{ DropdownIndicator }}
                options={[]}
                id="multiSelect"
                inputId="shiftleader1"
                styles={customStyles}
                placeholder="select Family"
              />
            </div>
          </div>
          <div className={c.btnCn}>
            <button className={c.submitShi} >
              cancel
            </button>
            <button className={c.submitShi} style={{ color: "#f84018" }}>Submit</button>
          </div>
        </div>
      )}
      {!pc && (
        <React.Fragment>
          <div
            className={c.cardContainer}
            onClick={(e) => onClickHandler(e, "ab")}
          >
            <div className={c.card}>AB</div>
          </div>
          <div
            className={c.cardContainer}
            onClick={(e) => onClickHandler(e, "ap")}
          >
            <div className={c.card}>AP</div>
          </div>
          <div
            className={c.cardContainer}
            onClick={(e) => onClickHandler(e, "shift")}
          >
            <div className={c.card}>shift</div>
          </div>
          <div
            className={c.cardContainer}
            onClick={(e) => onClickHandler(e, "ad")}
          >
            <div className={c.card}>Admin</div>
          </div>
          <div
            className={c.cardContainer}
            onClick={(e) => onClickHandler(e, "ot")}
          >
            <div className={c.card}>over time</div>
          </div>
          <div
            className={c.cardContainer}
            onClick={(e) => onClickHandler(e, "ma")}
          >
            <div className={c.card}>ma</div>
          </div>
          <div
            className={c.cardContainer}
            onClick={(e) => onClickHandler(e, "ctp")}
          >
            <div className={c.card}>ctp</div>
          </div>
          <div
            className={c.cardContainer}
            onClick={(e) => onClickHandler(e, "ctn")}
          >
            <div className={c.card}>ctn</div>
          </div>
          <div
            className={c.cardContainer}
            onClick={(e) => onClickHandler(e, "cr")}
          >
            <div className={c.card}>cr</div>
          </div>
          <div
            className={c.cardContainer}
            onClick={(e) => onClickHandler(e, "t")}
          >
            <div className={c.card}>t</div>
          </div>
          <div
            className={c.cardContainer}
            onClick={(e) => onClickHandler(e, "tl")}
          >
            <div className={c.card}>tl</div>
          </div>
          <div
            className={c.cardContainer}
            onClick={(e) => onClickHandler(e, "retard")}
          >
            <div className={c.card}>retard</div>
          </div>
          <div
            className={c.cardContainer}
            onClick={(e) => onClickHandler(e, "other")}
          >
            <div className={c.card}>other</div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Pointing;
