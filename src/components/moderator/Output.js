import c from "./Output.module.css";

const Output = (p) => {
  return (
    <div className={c.container}>
      <div className={c.title2}>
        <div className={c.line}></div>
        <h4>Mutation history</h4>
      </div>
      <div className={c.trainingH}>
        <div className={c.dater}>
          <div className={c.dataT} style={{ width: "60%" }}>
            <h3 style={{ color: "#E5E1DA" }}>date</h3>
          </div>
          <div className={c.dataT} style={{ width: "40%" }}>
            <h3 style={{ color: "#E5E1DA" }}>cmt by</h3>
          </div>
        </div>
        <div
          className={c.dater}
          style={{ backgroundColor: "#383942", width: "20%" }}
        >
          <div className={c.dataT}>
            <h3>employee</h3>
          </div>
        </div>
        <div className={c.trainingDi}>
          <div className={c.dataT} style={{ width: "50%" }}>
            <h3>tl src</h3>
          </div>
          <div className={c.dataT} style={{ width: "50%" }}>
            <h3>crew src</h3>
          </div>
        </div>
        <div className={c.trainingD}>
          <div className={c.dataT} style={{ width: "50%" }}>
            <h3>tl des</h3>
          </div>
          <div className={c.dataT} style={{ width: "50%" }}>
            <h3>crew des</h3>
          </div>
        </div>
        <div className={c.dater} style={{ width: "20%" }}>
          <div className={c.dataT}>
            <h3 style={{ color: "#FFA211" }}>mut type</h3>
          </div>
        </div>
      </div>
      <div className={c.wraper}></div>
    </div>
  );
};

export default Output;
