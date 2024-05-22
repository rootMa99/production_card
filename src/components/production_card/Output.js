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

  console.log("tlist", data);
  return (
    <div className={c.container}>
      <div className={c.pointingEmpl}>
        <div className={c.poinHoldWraper}>
          <div className={c.poinHold}>
            <span>Family</span>
            <Select
              components={{ DropdownIndicator }}
              options={data.map((m) => ({ label: m.family, value: m.family }))}
              id="multiSelect"
              inputId="shiftleader1"
              styles={customStyles}
              placeholder="select Family"
            />
          </div>
          <div className={c.poinHold}>
            <span>Reference</span>
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
        </div>
        <button className={c.submitShi}>Submit</button>
      </div>
    </div>
  );
};

export default Output;
