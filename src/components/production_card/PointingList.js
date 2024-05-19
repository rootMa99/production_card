import React, { useEffect, useState } from "react";
import c from "./PointingList.module.css";

const PointingList = (p) => {
  const [dataList, setDataList] = useState(p.data);
  const [inputValue, setInputValue] = useState("");
  const [eid, setEid] = useState("");
  useEffect(() => {
    setDataList(p.data);
  }, [p.data]);
  // console.log(dataList, p.data);
  const changeHandler = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputValue(value);
      if (e.target.value.trim() !== "") {
        setDataList(
          p.data.filter((obj) =>
            String(obj["matricule"]).includes(e.target.value)
          )
        );
      } else {
        setDataList(p.data);
      }
    }
  };
  return (
    <div className={c.container}>
      <input
        type="number"
        placeholder="search by matricule"
        className={c.searchmlle}
        value={inputValue}
        onChange={changeHandler}
        pattern="[0-9]*"
      />
      <div className={c.trainingH}>
        <div className={c.trainingDi} style={{ backgroundColor: "#E5E1DA" }}>
          <div className={c.dataT} style={{ width: "33%" }}>
            <h3>mlle</h3>
          </div>
          <div className={c.dataT} style={{ width: "33%" }}>
            <h3>poste</h3>
          </div>
          <div className={c.dataT} style={{ width: "33%" }}>
            <h3>Pointing</h3>
          </div>
        </div>
        <div className={c.trainingD} style={{ backgroundColor: "#E5E1DA" }}>
          <div className={c.dataT} style={{ width: "50%" }}>
            <h3 style={{ color: "black" }}>hours</h3>
          </div>
          <div className={c.dataT} style={{ width: "50%" }}>
            <h3 style={{ color: "black" }}>status</h3>
          </div>
        </div>
      </div>
      <div className={c.wraper}>
        {dataList.length > 0 ? (
          dataList.map((m) => (
            <React.Fragment>
              <div className={c.trainingH} key={m._id} onClick={e=>setEid(m._id)}>
                <div className={c.trainingD}>
                  <div className={c.dataT} style={{ width: "33%" }}>
                    <h3>{m.matricule}</h3>
                  </div>
                  <div className={c.dataT} style={{ width: "33%" }}>
                    <h3>{m.poste}</h3>
                  </div>
                  <div className={c.dataT} style={{ width: "33%" }}>
                    <h3>shift</h3>
                  </div>
                </div>
                <div className={c.trainingDi}>
                  <div className={c.dataT} style={{ width: "50%" }}>
                    <h3>7.67</h3>
                  </div>
                  <div className={c.dataT} style={{ width: "50%" }}>
                    <h3>none</h3>
                  </div>
                </div>
              </div>
              {eid === m._id && <div className={c.pointingEmpl}></div>}
            </React.Fragment>
          ))
        ) : (
          <h4 className={c.noCrewS}>No employees were found</h4>
        )}
      </div>
    </div>
  );
};

export default PointingList;
