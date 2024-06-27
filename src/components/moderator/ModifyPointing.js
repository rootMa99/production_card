import c from "./ModifyPointing.module.css";

const ModifyPointing = ({ data }) => {
  console.log(data);
  return (
    <div className={c.container}>
      <div className={c.title2}>
        <div className={c.line}></div>
        <h4 style={{ fontSize: "25px" }}>Modify Pointing</h4>
      </div>
    </div>
  );
};

export default ModifyPointing;
