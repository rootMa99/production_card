import c from "./Home.module.css";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import DropdownIndicator from "../UI/DropdownIndicator";
import { useEffect, useState } from "react";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minWidth: "20rem",
    minHeight: "15px",
    fontSize: "10px",
    fontWeight: "bold",
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

const calculateHours = (startTimeStr, endTimeStr) => {
  const startTimeParts = startTimeStr.split(":");
  const startHours = parseInt(startTimeParts[0], 10);
  const startMinutes = parseInt(startTimeParts[1], 10);
  const endTimeParts = endTimeStr.split(":");
  const endHours = parseInt(endTimeParts[0], 10);
  const endMinutes = parseInt(endTimeParts[1], 10);
  const startTime = new Date();
  startTime.setHours(startHours, startMinutes, 0);
  const endTime = new Date();
  endTime.setHours(endHours, endMinutes, 0);
  const timeDifference = endTime.getTime() - startTime.getTime();
  const hoursDifference = timeDifference / (1000 * 60 * 60);

  return hoursDifference;
};

const HomeOt = () => {
  const [hours, setHours] = useState({
    start: "",
    end: "",
  });
  const [ovf, setOvf] = useState([]);
  useEffect(() => {
    if (hours.end.trim() !== "" && hours.start.trim() !== "") {
      console.log(calculateHours(hours.start, hours.end));
    }
  }, [hours.end, hours.start]);

  const onchangeHandlercb = (e, i) => {
    if (e.target.checked) {
      setOvf((p) => [...p, i]);
    }
    if (!e.target.checked) {
      setOvf((p) => p.filter((f) => f !== i));
    }
  };

  return (
    <div className={c.container}>
      <div className={c.title2}>
        <div className={c.line}></div>
        <h4>overTime</h4>
      </div>
      <div className={c.poinForm}>
        <div className={c.poinHold}>
          <span>matricules</span>
          <CreatableSelect
            components={{ DropdownIndicator }}
            options={[]}
            id="multiSelect"
            inputId="shiftleader1"
            styles={customStyles}
            placeholder="select matricules"
            isMulti
          />
        </div>
        <div className={c.poinHold}>
          <span>category</span>
          <Select
            components={{ DropdownIndicator }}
            options={[
              {
                label: "dh",
                value: "dh",
              },
              {
                label: "ih",
                value: "ih",
              },
            ]}
            id="multiSelect"
            inputId="shiftleader1"
            styles={customStyles}
            placeholder="select category"
          />
        </div>
        <div className={c.poinHold}>
          <span>category</span>
          <input type="date" />
        </div>
        <div className={c.poinHold}>
          <span>start</span>
          <input
            type="time"
            onChange={(e) => setHours((p) => ({ ...p, start: e.target.value }))}
          />
        </div>
        <div className={c.poinHold}>
          <span>end</span>
          <input
            type="time"
            onChange={(e) => setHours((p) => ({ ...p, end: e.target.value }))}
          />
        </div>
        <div className={c.poinHold}>
          <span>motif</span>
          <input type="text" placeholder="enter motif" />
        </div>
        <h4 className={c.copenh}>Overtime hours are for:</h4>
        <div className={c.task}>
          <input
            id={"m._id"}
            type="checkbox"
            checked={ovf.includes("recovery")}
            hidden
            onChange={(e) => onchangeHandlercb(e, "recovery")}
          />
          <label
            htmlFor={"m._id"}
            style={
              ovf.includes("recovery")
                ? { color: "#f33716", fontWeight: 700 }
                : { color: "aliceblue", fontWeight: "normal" }
            }
          >
            Recovery
          </label>
        </div>
        <div className={c.task}>
          <input
            id={"m._id25"}
            type="checkbox"
            checked={ovf.includes(25)}
            hidden
            onChange={(e) => onchangeHandlercb(e, 25)}
          />
          <label
            htmlFor={"m._id25"}
            style={
              ovf.includes(25)
                ? { color: "#f33716", fontWeight: 700 }
                : { color: "aliceblue", fontWeight: "normal" }
            }
          >
            25%
          </label>
        </div>
        {ovf.includes(25) && (
            <div className={c.pointingEmpl} style={{ marginBottom: "1rem" }}>
              <div className={c.poinHold}>
                <span>Number of hours</span>
                <input
                  type="number"
                  placeholder="enter Number of hours"
                  min={0}
                />
              </div>
            </div>
          )}
        <div className={c.task}>
          <input
            id={"m._id50"}
            type="checkbox"
            checked={ovf.includes(50)}
            hidden
            onChange={(e) => onchangeHandlercb(e, 50)}
          />
          <label
            htmlFor={"m._id50"}
            style={
              ovf.includes(50)
                ? { color: "#f33716", fontWeight: 700 }
                : { color: "aliceblue", fontWeight: "normal" }
            }
          >
            50%
          </label>
        </div>
        {ovf.includes(50) && (
            <div className={c.pointingEmpl} style={{ marginBottom: "1rem" }}>
              <div className={c.poinHold}>
                <span>Number of hours</span>
                <input
                  type="number"
                  placeholder="enter Number of hours"
                  min={0}
                />
              </div>
            </div>
          )}
        <div className={c.task}>
          <input
            id={"m._id100"}
            type="checkbox"
            checked={ovf.includes(100)}
            hidden
            onChange={(e) => onchangeHandlercb(e, 100)}
          />
          <label
            htmlFor={"m._id100"}
            style={
              ovf.includes(100)
                ? { color: "#f33716", fontWeight: 700 }
                : { color: "aliceblue", fontWeight: "normal" }
            }
          >
            100%
          </label>
        </div>
        {ovf.includes(100) && (
          <div className={c.pointingEmpl} style={{ marginBottom: "1rem" }}>
            <div className={c.poinHold}>
              <span>Number of hours</span>
              <input
                type="number"
                placeholder="enter Number of hours"
                min={0}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeOt;
