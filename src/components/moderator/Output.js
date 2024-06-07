import c from "./Output.module.css";

const Output = (p) => {
  return (
    <div className={c.container}>
      <div className={c.title2}>
        <div className={c.line}></div>
        <h4>output</h4>
      </div>
      <div className={c.trainingH}>
        <div className={c.dater}>
          <div className={c.dataT}>
            <h3 style={{ color: "#E5E1DA" }}>date</h3>
          </div>
        </div>
        <div className={c.trainingD}>
          <div className={c.dataT}>
            <h3>tl des</h3>
          </div>
        </div>
        <div className={c.trainingDi}>
          <div className={c.dataT}>
            <h3>tl src</h3>
          </div>
        </div>

      </div>
      <div className={c.wraper}></div>
    </div>
  );
};

export default Output;
