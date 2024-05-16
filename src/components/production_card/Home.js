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
        <div className={c.data}>
          <h3>headcount</h3>
          <span>78</span>
        </div>
        <div className={c.data}>
          <h3>actual headcount</h3>
          <span>78</span>
        </div>
        <div className={c.data}>
          <h3>target</h3>
          <span>78</span>
        </div>
        <div className={c.data}>
          <h3>gap</h3>
          <span>0</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
