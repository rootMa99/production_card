import React from "react";
import c from "./ModifyPointing.module.css";

const ModifyPointing = (p) => {
  console.log(p.data);
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
            <span className={c.detail}>{p.data.poste}</span>
          </div>
          <div className={c.empData}>
            <span className={c.label}>paid hour:</span>
            <span className={c.detail}>{p.data.paidHour}</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ModifyPointing;
