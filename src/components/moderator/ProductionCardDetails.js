import c from "./ProductionCardDetails.module.css";
import lg from "../../assets/aptiv-logo.svg";
const ProductionCardDetails = (p) => {
  return (
    <div className={c.container}>
      <div className={c.head}>
        <h2>k01B</h2>
        <h3>family/project</h3>
      </div>
      <div className={c.crewDetails}>
        <div className={c.details}>
          <span>teamleader:</span> <span className={c.imp}>some name</span>
        </div>
        <div className={c.details}>
          <span>shiftleader:</span> <span className={c.imp}>some name</span>
        </div>
        <div className={c.details}>
          <span>coordinator:</span> <span className={c.imp}>some name</span>
        </div>
      </div>

      <img className={c.imglg} src={lg} alt="logo" />
    </div>
  );
};

export default ProductionCardDetails;
