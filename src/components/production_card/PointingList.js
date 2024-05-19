import { useEffect, useState } from "react";
import c from "./PointingList.module.css";

const PointingList = (p) => {
  const [dataList, setDataList] = useState(p.data);
  useEffect(() => {
    setDataList(p.data);
  }, [p.data]);
  console.log(dataList, p.data);
  return (
    <div className={c.container}>
      <input
        type="text"
        placeholder="search by matricule"
        className={c.searchmlle}
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
      {dataList.map((m) => (
        <div className={c.trainingH} key={m._id}>
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
      ))}
    </div>
  );
};

export default PointingList;
