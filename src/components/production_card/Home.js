import c from "./Home.module.css";

const Home = (p) => {
  return (
    <div className={c.container}>
    <div className={c.title}>
        <span></span>
        <h3> head count statistics</h3>
        <span></span>
      </div>
      <div className={c.hcContainer}>
        <div className={c.data}></div>
        <div className={c.data}></div>
        <div className={c.data}></div>
        <div className={c.data}></div>
      </div>
    </div>
  );
};

export default Home;
