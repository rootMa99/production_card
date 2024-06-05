import React, { useState } from "react";
import c from "./Pointing.module.css";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import DropdownIndicator from "../UI/DropdownIndicator";
import { isFriday, isSaturday } from "../hooks/daterelated";
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

const Pointing = (p) => {
  const [pc, setPc] = useState(false);
  const [typet, setTypet] = useState({
    t: "",
    title: "",
  });
  const [saePoin, setpoin] = useState({
    status: "",
    pointing: "shift",
    pointingOptions: [],
    ctnDuration: 0,
    otDuration: 0,
    tDuration: 0,
    retardDuration: 0,
    crDuration: 0,
    motif: "",
    details: "",
  });
  const [mlles, setMlles] = useState([]);
  const onClickHandler = (e, t) => {
    setPc(true);
    switch (t) {
      case "ab":
        setTypet({
          t: t,
          title: "ABSENT",
        });
        setpoin((p) => ({
          ...p,
          pointing: "ab",
        }));
        break;
      case "shift":
        setTypet({
          t: t,
          title: "shift",
        });
        setpoin((p) => ({
          ...p,
          pointing: "shift",
        }));
        break;
      case "ap":
        setTypet({
          t: t,
          title: "mise à pied",
        });
        setpoin((p) => ({
          ...p,
          pointing: "ap",
        }));
        break;
      case "ad":
        setTypet({
          t: t,
          title: "admin",
        });
        setpoin((p) => ({
          ...p,
          pointing: "admin",
        }));
        break;
      case "ot":
        setTypet({
          t: t,
          title: "ot",
        });
        setpoin((p) => ({
          ...p,
          pointingOptions: ["ot"],
        }));
        break;
      case "ma":
        setTypet({
          t: t,
          title: "maladie",
        });
        setpoin((p) => ({
          ...p,
          pointing: "ma",
        }));
        break;
      case "ctp":
        setTypet({
          t: t,
          title: "ctp",
        });
        setpoin((p) => ({
          ...p,
          pointing: "ctp",
        }));
        break;
      case "ctn":
        setTypet({
          t: t,
          title: "ctn",
        });
        setpoin((p) => ({
          ...p,
          pointingOptions: ["ctn"],
        }));
        break;
      case "cr":
        setTypet({
          t: t,
          title: "cr",
        });
        setpoin((p) => ({
          ...p,
          pointingOptions: ["cr"],
        }));
        break;
      case "t":
        setTypet({
          t: t,
          title: "autorisation",
        });
        setpoin((p) => ({
          ...p,
          pointingOptions: ["t"],
        }));
        break;
      case "tl":
        setTypet({
          t: t,
          title: "autorisation légal",
        });
        setpoin((p) => ({
          ...p,
          pointing: "tl",
        }));
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
        setpoin((p) => ({
          ...p,
          pointingOptions: ["retard"],
        }));
        break;
      default:
    }
  };
  console.log(pc, mlles);
  const onSubmith = async () => {
    let paidhour = 0;

    switch (saePoin.pointing) {
      case "shift":
        if (isFriday(p.today)) {
          paidhour =
            7.58 -
            saePoin.tDuration -
            saePoin.retardDuration -
            saePoin.ctnDuration +
            saePoin.otDuration;
        } else {
          paidhour =
            7.67 -
            saePoin.tDuration -
            saePoin.retardDuration -
            saePoin.ctnDuration +
            saePoin.otDuration;
        }
        break;
      case "admin":
        if (isSaturday(p.today)) {
          paidhour =
            4 -
            saePoin.tDuration -
            saePoin.retardDuration -
            saePoin.ctnDuration +
            saePoin.otDuration;
        } else {
          paidhour =
            8.17 -
            saePoin.tDuration -
            saePoin.retardDuration -
            saePoin.ctnDuration +
            saePoin.otDuration;
        }
        break;
      case "ab":
      case "ap":
      case "ma":
      case "tl":
      case "ctp":
        paidhour = 0;
        break;
      default:
    }

    const f = await p.postMultiEmpl(saePoin, mlles, paidhour);
    if (f) {
      setPc(false);
      setTypet({
        t: "",
        title: "",
      });
      setpoin({
        status: "",
        pointing: "shift",
        pointingOptions: [],
        ctnDuration: 0,
        otDuration: 0,
        tDuration: 0,
        retardDuration: 0,
        crDuration: 0,
        motif: "",
        details: "",
      });
      setMlles([]);
    }
  };

  return (
    <div className={c.container}>
      {pc && (
        <div className={c.pointingEmpl}>
          <h3 className={c.tlc}>{typet.title}</h3>
          <div className={c.poinHoldWraper}>
            <div className={c.poinHold}>
              <span>matricules</span>
              <Select
                components={{ DropdownIndicator }}
                options={p.data.map((m) => ({
                  label: m.matricule,
                  value: m.matricule,
                }))}
                id="multiSelect"
                inputId="shiftleader1"
                styles={customStyles}
                placeholder="select matricules"
                onChange={(e) => setMlles(e.map((m) => m.value))}
                isMulti
              />
            </div>
            {(typet.t === "ctn" || typet.t === "ctp") && (
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
                    onChange={(e) => setpoin((p) => ({ ...p, motif: e.value }))}
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
                    onChange={(e) =>
                      setpoin((p) => ({
                        ...p,
                        details: e === null ? "" : e.value,
                      }))
                    }
                    placeholder="select details or enter"
                  />
                </div>
              </React.Fragment>
            )}
            {typet.t === "ctn" && (
              <div className={c.poinHold}>
                <span>ctn duration</span>
                <input
                  type="number"
                  placeholder="ctn duration"
                  onChange={(e) =>
                    setpoin((p) => ({
                      ...p,
                      ctnDuration: +e.target.value / 60,
                    }))
                  }
                />
              </div>
            )}
            {typet.t === "cr" && (
              <div className={c.poinHold}>
                <span>cr duration</span>
                <input
                  type="number"
                  placeholder="cr duration"
                  onChange={(e) =>
                    setpoin((p) => ({
                      ...p,
                      crDuration: +e.target.value / 60,
                    }))
                  }
                />
              </div>
            )}
            {typet.t === "t" && (
              <div className={c.poinHold}>
                <span>Authorisation duration</span>
                <input
                  type="number"
                  placeholder="t duration"
                  onChange={(e) =>
                    setpoin((p) => ({
                      ...p,
                      tDuration: +e.target.value / 60,
                    }))
                  }
                />
              </div>
            )}
            {typet.t === "retard" && (
              <div className={c.poinHold}>
                <span>retard duration</span>
                <input
                  type="number"
                  placeholder="retard duration"
                  onChange={(e) =>
                    setpoin((p) => ({
                      ...p,
                      retardDuration: +e.target.value / 60,
                    }))
                  }
                />
              </div>
            )}
            {typet.t === "ot" && (
              <div className={c.poinHold}>
                <span>overtime duration</span>
                <input
                  type="number"
                  placeholder="overtime duration"
                  onChange={(e) =>
                    setpoin((p) => ({
                      ...p,
                      otDuration: +e.target.value / 60,
                    }))
                  }
                />
              </div>
            )}
          </div>
          <div className={c.btnCn}>
            <button
              className={c.submitShi}
              onClick={(e) => {
                setPc(false);
                setTypet({
                  t: "",
                  title: "",
                });
                setpoin({
                  status: "",
                  pointing: "shift",
                  pointingOptions: [],
                  ctnDuration: 0,
                  otDuration: 0,
                  tDuration: 0,
                  retardDuration: 0,
                  crDuration: 0,
                  motif: "",
                  details: "",
                });
                setMlles([]);
              }}
            >
              cancel
            </button>
            <button
              className={c.submitShi}
              style={{ color: "#f84018" }}
              onClick={onSubmith}
            >
              Submit
            </button>
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
            <div className={c.card}>overtime</div>
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
          
        </React.Fragment>
      )}
    </div>
  );
};

export default Pointing;
