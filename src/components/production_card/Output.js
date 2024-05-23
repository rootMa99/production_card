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
      dataref: {
        leadPrep: 0,
        cuting: 0,
        finalAssembly: 0,
        exigency: 0,
      },
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
  const callOutput = useCallback(async () => {
    try {
      const response = await fetch(
        `${api}/production-card/output?date=${p.datagetou.date}&crew=${p.datagetou.crew}&shift=${p.datagetou.shift}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isLoged.token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(response.status);
      }
      const d = await response.json();
      setOd(
        d.map((m) => ({
          id: m._id,
          family: m.family,
          dataref: {
            leadPrep: m.leadPrep,
            cuting: m.cuting,
            finalAssembly: m.finalAssembly,
            exigency: m.exigency,
          },
          ref: m.reference,
          exig: m.exig,
          prod: m.prod,
          ce: m.ce,
          emb: m.emb,
          cmmt: m.comment,
        }))
      );
      console.log(d);
    } catch (e) {
      console.error(e);
    }
  }, [isLoged.token, p.datagetou.date, p.datagetou.crew, p.datagetou.shift]);
  useEffect(() => {
    callback();
  }, [callback]);
  useEffect(() => {
    callOutput();
  }, [callOutput]);

  const onChangeHandler = (e, id, t) => {
    const i = od.findIndex((f) => f.id === id);
    switch (t) {
      case "family":
        setOd((p) => {
          return p.map((item, ind) => {
            if (i === ind) {
              return {
                ...item,
                family: e.value,
              };
            }
            return item;
          });
        });
        break;
      case "ref":
        setOd((p) => {
          return p.map((item, ind) => {
            if (i === ind) {
              const idf = data.findIndex((f) => f.family === od[i].family);
              let df = {};
              if (idf > -1) {
                df = data[idf].data.filter((f) => f.reference === e.value)[0];
              }
              return {
                ...item,
                ref: e.value,
                dataref: df,
              };
            }
            return item;
          });
        });
        break;
      case "exig":
        setOd((p) => {
          return p.map((item, ind) => {
            if (i === ind) {
              return {
                ...item,
                exig: +e.target.value,
              };
            }
            return item;
          });
        });
        break;
      case "Prod":
        setOd((p) => {
          return p.map((item, ind) => {
            if (i === ind) {
              return {
                ...item,
                prod: +e.target.value,
              };
            }
            return item;
          });
        });
        break;
      case "CE":
        setOd((p) => {
          return p.map((item, ind) => {
            if (i === ind) {
              return {
                ...item,
                ce: +e.target.value,
              };
            }
            return item;
          });
        });
        break;
      case "EMB":
        setOd((p) => {
          return p.map((item, ind) => {
            if (i === ind) {
              return {
                ...item,
                emb: +e.target.value,
              };
            }
            return item;
          });
        });
        break;
      case "commantaire":
        setOd((p) => {
          return p.map((item, ind) => {
            if (i === ind) {
              return {
                ...item,
                cmmt: e.value,
              };
            }
            return item;
          });
        });
        break;
      default:
    }
  };

  const getListRef = (id) => {
    const i = od.findIndex((f) => f.id === id);

    if (i > -1) {
      const idf = data.findIndex((f) => f.family === od[i].family);
      if (idf === -1) {
        return [];
      }
      console.log(od[i], data[idf], idf);
      return data[idf].data;
    } else {
      return [];
    }
  };
  useEffect(() => {
    p.prodHour(od);
  }, [od, p]);
  console.log("tlist", data, od);

  const submitoutputdata = async () => {
    await p.sendOutput(od);
  };

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
                options={getListRef(m.id).map((m) => ({
                  label: m.reference,
                  value: m.reference,
                }))}
                id="multiSelect"
                inputId="shiftleader1"
                styles={customStyles}
                placeholder="select Reference"
                onChange={(e) => onChangeHandler(e, m.id, "ref")}
              />
            </div>

            <div className={c.poinHold}>
              <span>exig</span>
              <input
                type="number"
                placeholder="set exig"
                onChange={(e) => onChangeHandler(e, m.id, "exig")}
              />
            </div>
            <div className={c.poinHold}>
              <span>Prod</span>
              <input
                type="number"
                placeholder="set Prod"
                onChange={(e) => onChangeHandler(e, m.id, "Prod")}
              />
            </div>
            <div className={c.poinHold}>
              <span>CE</span>
              <input
                type="number"
                placeholder="set CE"
                onChange={(e) => onChangeHandler(e, m.id, "CE")}
              />
            </div>
            <div className={c.poinHold}>
              <span>EMB</span>
              <input
                type="number"
                placeholder="set EMB"
                onChange={(e) => onChangeHandler(e, m.id, "EMB")}
              />
            </div>
            <div className={c.poinHold}>
              <span>comment</span>
              <Select
                components={{ DropdownIndicator }}
                options={[
                  { label: "serie", value: "serie" },
                  { label: "mpr", value: "mpr" },
                ]}
                id="multiSelect"
                inputId="shiftleader1"
                styles={customStyles}
                placeholder="select comment"
                onChange={(e) => onChangeHandler(e, m.id, "commantaire")}
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
                  dataref: {
                    leadPrep: 0,
                    cuting: 0,
                    finalAssembly: 0,
                    exigency: 0,
                  },
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
          <button className={c.submitShi} onClick={submitoutputdata}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Output;
