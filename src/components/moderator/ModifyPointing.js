import React from "react";
import c from "./ModifyPointing.module.css";

const ModifyPointing = ({ data }) => {
  console.log(data);
  return (
    <React.Fragment>
    <div className={c.backDrop}></div>
    <div className={c.container} onClick={(e) => console.log("clicked")}>
      <div className={c.title2}>
        <div className={c.line}></div>
        <h4 style={{ fontSize: "25px" }}>Modify Pointing</h4>
      </div>
    </div>
    </React.Fragment>
  );
};

export default ModifyPointing;
