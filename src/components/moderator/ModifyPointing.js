import React, { useCallback, useEffect, useState } from "react";
import c from "./ModifyPointing.module.css";
import Select from "react-select";
import DropdownIndicator from "..//UI/DropdownIndicator";
import CreatableSelect from "react-select/creatable";
// import api from "../../service/api";
// import { useSelector } from "react-redux";
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minWidth: "15rem",
    minHeight: "20px",
    padding: "8px 0",
    fontSize: "15px",
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
    width: "100%",
    padding: "10px 0",
    color: state.isFocused ? "#f3f3f3" : "#f33716",
    backgroundColor: state.isFocused && "#F84018",
    fontFamily: `Formular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                            "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
                            "Segoe UI Symbol"`,
    textTransform: "uppercase",
    outline: "none",
    textAlign: "center",
    fontSize: "15px",
    "&:hover": {
      cursor: "pointer",
    },
  }),
  input: (provided) => ({
    ...provided,
    color: "#fff",
    fontSize: "15px",
    textAlign: "center",
  }),
  singleValue: (p) => ({
    ...p,
    color: "#fff",
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 4,
  }),
  menuList: (provided) => ({
    maxHeight: "150px",
    overflowY: "auto",
    overflowX: "hidden",
    scrollbarWidth: "thin",
    msOverflowStyle: "none",
    zIndex: 3,
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
const ModifyPointing = (p) => {
//   const { isLoged } = useSelector((s) => s.login);
  const o = p.data;
  const [saePoin, setpoin] = useState({
    status: o.status === undefined ? "" : o.status,
    pointing: o.pointing === undefined ? "" : o.pointing,
    pointingOptions: o.pointingOptions === undefined ? [] : o.pointingOptions,
    ctnDuration: o.ctn === undefined ? 0 : o.ctn,
    otDuration: o.ot === undefined ? 0 : o.ot,
    tDuration: o.t === undefined ? 0 : o.t,
    crDuration: o.cr === undefined ? 0 : o.cr,
    retardDuration: o.retard === undefined ? 0 : o.retard,
    // ttl: o.to === undefined ? "" : o.to.teamleader,
    // tCrew: o.to === undefined ? "" : o.to.crew,
    // mutType: o.to === undefined ? "" : o.to.isDefinitely,
    motif: o.motif === undefined ? "" : o.motif,
    details: o.details === undefined ? "" : o.details,
  });
//   const [dataEp, setDataEp] = useState([]);
//   const [tom, setTom] = useState([
//     {
//       id: Math.random(),
//       teamleader: "",
//       crew: "",
//       paidHour: 0,
//     },
//   ]);
//   const callback = useCallback(async () => {
//     try {
//       const response = await fetch(`${api}/employee/crews-by-tl/`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${isLoged.token}`,
//         },
//       });
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       const d = await response.json();
//       console.log("tl&crew:", d);
//       setDataEp(d);
//     } catch (e) {
//       console.error(e);
//     }
//   }, [isLoged.token]);
//   useEffect(() => {
//     callback();
//   }, [callback]);
//   const changetlm = (i, v) => {
//     const ind = tom.findIndex((f) => f.id === i);
//     console.log(ind);
//     return ind;
//   };

  console.log(p.data, saePoin);
  return (
    <React.Fragment>
      <div className={c.backDrop} onClick={(e) => p.close()}></div>
      <div className={c.container} onClick={(e) => console.log("clicked")}>
        <div className={c.title2}>
          <div className={c.line}></div>
          <h4 style={{ fontSize: "25px" }}>Modify Pointing</h4>
        </div>
        <div className={c.header}>
          <div className={c.empData}>
            <span className={c.label}>matricule:</span>
            <span className={c.detail}>{p.data.matricule}</span>
          </div>
          <div className={c.empData}>
            <span className={c.label}>poste:</span>
            <span className={c.detail}>
              {p.data.poste.trim() === "" ? "--" : p.data.poste}
            </span>
          </div>
          <div className={c.empData}>
            <span className={c.label}>paid hour:</span>
            <span className={c.detail}>{p.data.paidHour.toFixed(2)}</span>
          </div>
        </div>
        <div className={c.pointingData}>
          <div className={c.poinHold}>
            <span>Pointing</span>
            <Select
              components={{ DropdownIndicator }}
              options={[
                { label: "shift", value: "shift" },
                { label: "admin", value: "admin" },
                { label: "ab", value: "ab" },
                { label: "ap", value: "ap" },
                { label: "ma", value: "ma" },
                { label: "mt", value: "mt" },
                { label: "tl", value: "tl" },
                { label: "t", value: "t" },
                { label: "ctp", value: "ctp" },
                { label: "di", value: "di" },
                { label: "dn", value: "dn" },
                { label: "te", value: "te" },
                { label: "at", value: "at" },
                { label: "cr", value: "cr" },
                { label: "mutation", value: "mutation" },
              ]}
              id="multiSelect"
              inputId="shiftleader1"
              styles={customStyles}
              placeholder="select shift"
              onChange={(e) =>
                setpoin((p) => ({
                  ...p,
                  pointingOptions: [],
                  ctnDuration: 0,
                  otDuration: 0,
                  tDuration: 0,
                  retardDuration: 0,
                  crDuration: 0,
                  pointing: e.value,
                }))
              }
              value={{
                label: saePoin.pointing,
                value: saePoin.pointing,
              }}
            />
          </div>
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
              value={{
                label: saePoin.motif,
                value: saePoin.motif,
              }}
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
              value={{
                label: saePoin.details,
                value: saePoin.details,
              }}
              placeholder="select details or enter"
            />
          </div>
          <div className={c.poinHold}>
            <span>Pointing exc</span>
            <Select
              components={{ DropdownIndicator }}
              options={[
                { label: "ot", value: "ot" },
                { label: "ctn", value: "ctn" },
                { label: "cr", value: "cr" },
                { label: "t", value: "t" },
                { label: "retard", value: "retard" },
                { label: "mutation", value: "mutation" },
              ]}
              id="multiSelect"
              inputId="shiftleader1"
              styles={customStyles}
              placeholder="select exc"
              isMulti
              value={saePoin.pointingOptions.map((m) => ({
                label: m,
                value: m,
              }))}
              onChange={(e) =>
                setpoin((p) => ({
                  ...p,
                  pointingOptions: e.map((m) => m.value),
                }))
              }
            />
          </div>

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
              value={saePoin.crDuration * 60}
            />
          </div>
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
              value={saePoin.ctnDuration * 60}
            />
          </div>
          <div className={c.poinHold}>
            <span>overtime duration</span>
            <input
              type="number"
              placeholder="ot duration"
              onChange={(e) =>
                setpoin((p) => ({
                  ...p,
                  otDuration: +e.target.value / 60,
                }))
              }
              value={saePoin.otDuration * 60}
            />
          </div>
          <div className={c.poinHold}>
            <span>t duration</span>
            <input
              type="number"
              placeholder="t duration"
              onChange={(e) =>
                setpoin((p) => ({
                  ...p,
                  tDuration: +e.target.value / 60,
                }))
              }
              value={saePoin.tDuration * 60}
            />
          </div>
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
              value={saePoin.retardDuration * 60}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ModifyPointing;



// {saePoin.pointing === "mutation" && (
//     <React.Fragment>
//       <div className={c.poinHold}>
//         <span>targeted tl</span>
//         <Select
//           components={{ DropdownIndicator }}
//           options={dataEp.map((m) => ({
//             label: m.tl.fullname,
//             value: m.tl.username,
//           }))}
//           id="multiSelect"
//           inputId="shiftleader1"
//           styles={customStyles}
//           placeholder="select teamleader"
//           onChange={(e) => setpoin((p) => ({ ...p, ttl: e.value }))}
//           value={{
//             label: saePoin.ttl,
//             value: saePoin.ttl,
//           }}
//         />
//       </div>
//       {saePoin.ttl.trim() !== "" && (
//         <div className={c.poinHold}>
//           <span>targeted crew</span>
//           <Select
//             components={{ DropdownIndicator }}
//             options={dataEp
//               .filter((f) => f.tl.username === saePoin.ttl)[0]
//               .crews.map((m) => ({
//                 label: m,
//                 value: m,
//               }))}
//             id="multiSelect"
//             inputId="shiftleader1"
//             styles={customStyles}
//             placeholder="select crew"
//             onChange={(e) =>
//               setpoin((p) => ({
//                 ...p,
//                 tCrew: e.value,
//               }))
//             }
//             value={{
//                 label: saePoin.tCrew,
//                 value: saePoin.tCrew,
//               }}
//           />
//         </div>
//       )}
//       <div className={c.poinHold}>
//         <span>mutation type</span>
//         <Select
//           components={{ DropdownIndicator }}
//           options={[
//             {
//               label: "temporelle",
//               value: "temporelle",
//             },
//             {
//               label: "Définitivement",
//               value: "Définitivement",
//             },
//           ]}
//           id="multiSelect"
//           inputId="shiftleader1"
//           styles={customStyles}
//           placeholder="select type"
//           onChange={(e) => setpoin((p) => ({ ...p, mutType: e.value }))}
//         />
//       </div>
//     </React.Fragment>
//   )}
//   {saePoin.pointingOptions.includes("mutation") && (
//     <div className={c.mutexpx}>
//       {tom.map((m) => (
//         <div className={c.tomwrap} key={m.id}>
//           <div className={c.poinHold}>
//             <span>targeted tl</span>
//             <Select
//               components={{ DropdownIndicator }}
//               options={dataEp.map((m) => ({
//                 label: m.tl.fullname,
//                 value: m.tl.username,
//               }))}
//               id="multiSelect"
//               inputId="shiftleader1"
//               styles={customStyles}
//               placeholder="select teamleader"
//               onChange={(e) => {
//                 setTom((p) => {
//                   return p.map((item, ind) => {
//                     if (changetlm(m.id) === ind) {
//                       return {
//                         ...item,
//                         teamleader: e.value,
//                       };
//                     }
//                     return item;
//                   });
//                 });
//               }}
//               // value={{
//               //   label: poin.ttl,
//               //   value: poin.ttl,
//               // }}
//             />
//           </div>
//           {tom[changetlm(m.id)].teamleader.trim() !== "" && (
//             <React.Fragment>
//               <div className={c.poinHold}>
//                 <span>targeted crew</span>
//                 <Select
//                   components={{ DropdownIndicator }}
//                   options={dataEp
//                     .filter(
//                       (f) =>
//                         f.tl.username ===
//                         tom[changetlm(m.id)].teamleader
//                     )[0]
//                     .crews.map((m) => ({
//                       label: m,
//                       value: m,
//                     }))}
//                   id="multiSelect"
//                   inputId="shiftleader1"
//                   styles={customStyles}
//                   placeholder="select crew"
//                   onChange={(e) => {
//                     setTom((p) => {
//                       return p.map((item, ind) => {
//                         if (changetlm(m.id) === ind) {
//                           return {
//                             ...item,
//                             crew: e.value,
//                           };
//                         }
//                         return item;
//                       });
//                     });
//                   }}
//                 />
//               </div>
//               <div className={c.poinHold}>
//                 <span>duration</span>
//                 <input
//                   type="number"
//                   placeholder="set duration"
//                   onChange={(e) => {
//                     setTom((p) => {
//                       return p.map((item, ind) => {
//                         if (changetlm(m.id) === ind) {
//                           return {
//                             ...item,
//                             paidHour: +e.target.value / 60,
//                           };
//                         }
//                         return item;
//                       });
//                     });
//                   }}
//                 />
//               </div>
//             </React.Fragment>
//           )}
//         </div>
//       ))}
//       <h5
//         className={c.addnewinputs}
//         onClick={(e) =>
//           setTom((p) => [
//             ...p,
//             {
//               id: Math.random(),
//               teamleader: "",
//               crew: "",
//               paidHour: 0,
//             },
//           ])
//         }
//       >
//         add new teamleader
//       </h5>
//     </div>
//   )}