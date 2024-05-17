import { useState } from "react";
import c from "./Home.module.css";
import Select from "react-select";
import DropdownIndicator from "../UI/DropdownIndicator";
import "./SelectCSS.css"

const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "5rem",
      height:"2px",
      fontSize:"10px",
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
      padding: "0.5rem",
      color: state.isFocused ? "#f3f3f3" : "#f33716",
      backgroundColor: state.isFocused && "#474b4d",
      fontFamily: `Formular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
                    "Segoe UI Symbol"`,
      textTransform: "uppercase",
      outline: "none",
      textAlign: "center",
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
          options={[
            { label: "k01A", value: "k01A" },
            { label: "K01B", value: "K01B" },
            { label: "K01C", value: "K01C" },]
          }
          id="multiSelect"
          inputId="shiftleader1"
          styles={customStyles}
          placeholder="select crew"

        />
        </div>
      </div>
      <div className={c.title}>
        <span></span>
        <h3> head count statistics</h3>
        <span></span>
      </div>
      <div className={c.hcContainer}>
        <div className={c.data}>
          <h3>headcount</h3>
          <span>78</span>
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
    </div>
  );
};

export default Home;
