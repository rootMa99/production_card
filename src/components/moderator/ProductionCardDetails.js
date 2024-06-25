import c from "./ProductionCardDetails.module.css";
import lg from "../../assets/aptiv-logo.svg"
const ProductionCardDetails = (p) => {
  return (
    <div className={c.container}>
      <div className={c.head}>
        <h3>k01B</h3>
        <h4>family/project</h4>
      </div>
      <div className={c.crewDetails}>
        <div className={c.details}>
          <span>teamleader:</span> <span>some name</span>
        </div>
        <div className={c.details}>
          <span>shiftleader:</span> <span>some name</span>
        </div>
        <div className={c.details}>
          <span>coordinator:</span> <span>some name</span>
        </div>
      </div>

      <img className={c.imglg} src={lg} alt="logo" />
    </div>
  );
};

export default ProductionCardDetails;
