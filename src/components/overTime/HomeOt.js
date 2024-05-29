import c from "./Home.module.css";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import DropdownIndicator from "../UI/DropdownIndicator";


const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minWidth: "15rem",
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
      padding: "6px 0",
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


const HomeOt = () => {
  return <div className={c.container}>
  
  </div>;
};

export default HomeOt;
