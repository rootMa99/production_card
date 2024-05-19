import React, { useState } from "react";
import c from "./Home.module.css";
import Select from "react-select";
import DropdownIndicator from "../UI/DropdownIndicator";
import "./SelectCSS.css";
import Pointing from "./Pointing";
import PointingList from "./PointingList";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "8rem",
    height: "2px",
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
  const [control, setControl] = useState("pbl");
  const [data, setData] = useState([
    {
      _id: {
        crew: "K02C",
        family: "PPL",
        project: "K9 PPL",
        teamleader: "461",
        shiftleader: "380",
        coordinator: "2738",
        teamleader_fullname: "HAMDAN LAHCEN",
        shiftleader_fullname: "TIFFOU MOHAMED",
        coordinator_fullname: "ALMORABET ABDELOUAHID",
      },
      employees: [
        {
          _id: "66462d3c31d2da8e883847e9",
          matricule: 1788,
          poste: "Polyvalent",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e883847eb",
          matricule: 2772,
          poste: "Polyvalent",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e883847ed",
          matricule: 1295,
          poste: "Polyvalent",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e883847ef",
          matricule: 4466,
          poste: "Polyvalent",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e883847f1",
          matricule: 405,
          poste: "Réparation",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e883847f3",
          matricule: 3040,
          poste: "US 01",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e883847f5",
          matricule: 7351,
          poste: "US 02",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e883847f7",
          matricule: 5997,
          poste: "US 03",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e883847f9",
          matricule: 7644,
          poste: "US 04",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e883847fb",
          matricule: 5382,
          poste: "US 06",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e883847fd",
          matricule: 4718,
          poste: "US 08",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e883847ff",
          matricule: 7058,
          poste: "US 08",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384801",
          matricule: 6953,
          poste: "US 09",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384803",
          matricule: 7047,
          poste: "US 10",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384805",
          matricule: 5930,
          poste: "Cell 01-A",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384807",
          matricule: 5791,
          poste: "Cell 01-A",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384809",
          matricule: 7106,
          poste: "Cell 01-A",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e8838480b",
          matricule: 7144,
          poste: "Cell 01-A",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e8838480d",
          matricule: 2914,
          poste: "Cell 02",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e8838480f",
          matricule: 2949,
          poste: "Cell 03",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384811",
          matricule: 1606,
          poste: "Cell 04",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384813",
          matricule: 3004,
          poste: "Cell 06",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384815",
          matricule: 6858,
          poste: "Cell 07",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384817",
          matricule: 5080,
          poste: "Cell 08",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384819",
          matricule: 2264,
          poste: "Cell 08",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e8838481b",
          matricule: 5383,
          poste: "Cell 09",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e8838481d",
          matricule: 2606,
          poste: "Cell 10",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e8838481f",
          matricule: 2935,
          poste: "Cell 12",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384821",
          matricule: 6569,
          poste: "Cell 15-1",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384823",
          matricule: 1155,
          poste: "Cell 15-1",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384825",
          matricule: 2998,
          poste: "Cell 16",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384827",
          matricule: 6994,
          poste: "Cell 19",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384829",
          matricule: 3027,
          poste: "Cell 20",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e8838482b",
          matricule: 2910,
          poste: "Cell 22",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e8838482d",
          matricule: 2915,
          poste: "Cell 23",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e8838482f",
          matricule: 342,
          poste: "Cell 24",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384831",
          matricule: 2951,
          poste: "Cell 26",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384833",
          matricule: 2986,
          poste: "Cell 27",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384835",
          matricule: 3005,
          poste: "Cell 27",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384837",
          matricule: 4902,
          poste: "CM 01",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384839",
          matricule: 1690,
          poste: "CM 02",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e8838483b",
          matricule: 2695,
          poste: "OPS",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e8838483d",
          matricule: 947,
          poste: "Poste 01",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e8838483f",
          matricule: 3865,
          poste: "Poste 02",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384841",
          matricule: 5735,
          poste: "Poste 03",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384843",
          matricule: 3029,
          poste: "Poste 03",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384845",
          matricule: 2985,
          poste: "Poste 04",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384847",
          matricule: 3049,
          poste: "Poste 05",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384849",
          matricule: 6937,
          poste: "Poste 05",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e8838484b",
          matricule: 1283,
          poste: "Poste 06",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e8838484d",
          matricule: 2953,
          poste: "Poste 08",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e8838484f",
          matricule: 6946,
          poste: "Poste 08-A",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384851",
          matricule: 2427,
          poste: "Poste 09",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384853",
          matricule: 5922,
          poste: "Poste 10",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384855",
          matricule: 5529,
          poste: "Poste 12",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384857",
          matricule: 6857,
          poste: "Poste 12",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384859",
          matricule: 3306,
          poste: "Poste 13",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e8838485b",
          matricule: 5999,
          poste: "Poste 14",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e8838485d",
          matricule: 6844,
          poste: "Poste 14",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e8838485f",
          matricule: 2859,
          poste: "Poste 15",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384861",
          matricule: 3000,
          poste: "Poste 16",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384863",
          matricule: 5894,
          poste: "Poste 17",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384865",
          matricule: 448,
          poste: "Poste 18-A",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384867",
          matricule: 3018,
          poste: "Poste 19",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384869",
          matricule: 6952,
          poste: "Poste 19",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e8838486b",
          matricule: 2808,
          poste: "Poste 20",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e8838486d",
          matricule: 6986,
          poste: "Poste 20",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e8838486f",
          matricule: 6666,
          poste: "Poste 21-A",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384871",
          matricule: 6607,
          poste: "Poste 22",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384873",
          matricule: 6841,
          poste: "Poste 23",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384875",
          matricule: 6487,
          poste: "Poste 23-A",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384877",
          matricule: 4473,
          poste: "Poste 23-A",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384879",
          matricule: 2978,
          poste: "Poste 25",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e8838487b",
          matricule: 6848,
          poste: "Poste 26",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e8838487d",
          matricule: 4385,
          poste: "Poste 27",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e8838487f",
          matricule: 6663,
          poste: "Poste 29",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384881",
          matricule: 7768,
          poste: "Vision Machine 03",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384883",
          matricule: 2891,
          poste: "BACKUP 01",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384885",
          matricule: 8052,
          poste: "BACKUP 02",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384887",
          matricule: 7707,
          poste: "BACKUP 04",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384889",
          matricule: 8034,
          poste: "BACKUP 06",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e8838488b",
          matricule: 8100,
          poste: "CELL 03",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e8838488d",
          matricule: 8099,
          poste: "Cell 01",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e8838488f",
          matricule: 8105,
          poste: "BACKUP 09",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384891",
          matricule: 8054,
          poste: "BACKUP 10",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384893",
          matricule: 2145,
          poste: "CELL 02",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384895",
          matricule: 8141,
          poste: "CM",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384897",
          matricule: 8284,
          poste: "Poste 13",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e88384899",
          matricule: 8311,
          poste: "",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e8838489b",
          matricule: 8282,
          poste: "Poste 13-1",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e8838489d",
          matricule: 8319,
          poste: "",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e8838489f",
          matricule: 8405,
          poste: "Poste 23",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e883848a1",
          matricule: 8261,
          poste: "",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e883848a3",
          matricule: 8279,
          poste: "",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e883848a5",
          matricule: 5252,
          poste: "",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e883848a7",
          matricule: 8222,
          poste: "",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e883848a9",
          matricule: 8499,
          poste: "",
          fullname: "",
        },
        {
          _id: "66462d3c31d2da8e883848ab",
          matricule: 8151,
          poste: "",
          fullname: "",
        },
      ],
    },
  ]);
  const [employeeCrew, setEmplpyeeCrew] = useState(null);
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
            options={data.map((m) => ({
              label: m._id.crew,
              value: m._id.crew,
            }))}
            id="multiSelect"
            inputId="shiftleader1"
            styles={customStyles}
            placeholder="select crew"
            onChange={(e) =>
              setEmplpyeeCrew(...data.filter((f) => f._id.crew === e.value))
            }
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
          />
        </div>
      </div>
      {employeeCrew === null ? (
        <h4 className={c.noCrewS}>Please select crew to proceed</h4>
      ) : (
        <React.Fragment>
          <div className={c.title}>
            <span></span>
            <h3> head count statistics</h3>
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
          {control === "pbc" && <Pointing />}
          {control === "pbl" && (
            <PointingList
              data={employeeCrew === null ? [] : employeeCrew.employees}
            />
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default Home;
