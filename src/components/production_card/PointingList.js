import c from "./PointingList.module.css";

const PointingList = (p) => {
  return (
    <div className={c.container}>
      <div className={c.trainingH}>
        <div className={c.trainingDi}>
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
        <div className={c.trainingD}>
          <div className={c.dataT} style={{ width: "50%" }}>
            <h3>hours</h3>
          </div>
          <div className={c.dataT} style={{ width: "50%" }}>
            <h3>status</h3>
          </div>
        </div>
      </div>
      {
        p.data.map(m=>(
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
            <h3>7.6</h3>
          </div>
          <div className={c.dataT} style={{ width: "50%" }}>
            <h3>none</h3>
          </div>
        </div>
      </div>
        ))
      }
    </div>
  );
};

export default PointingList;
