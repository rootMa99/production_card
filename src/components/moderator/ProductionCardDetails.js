import c from "./ProductionCardDetails.module.css";
import lg from "../../assets/aptiv-logo.svg";
const ProductionCardDetails = (p) => {
  return (
    <div className={c.container}>
      <div className={c.head}>
        <h2>{p.data.crew}</h2>
        <h3>
          {p.data.family} / {p.data.project}
        </h3>
      </div>
      <div className={c.crewDetails}>
        <div className={c.details}>
          <span>teamleader:</span>{" "}
          <span className={c.imp}>{p.data.teamleader}</span>
        </div>
        <div className={c.details}>
          <span>shiftleader:</span>{" "}
          <span className={c.imp}>{p.data.shiftleader}</span>
        </div>
        <div className={c.details}>
          <span>coordinator:</span>{" "}
          <span className={c.imp}>{p.data.coordinator}</span>
        </div>
      </div>
      <div className={c.pointingList}>
        <h3>pointing list:</h3>
        <table className={c.table}>
          <thead>
            <tr>
              <th>matricule</th>
              <th>poste</th>
              <th>pointing</th>
              <th>add. pointing</th>
              <th>ot</th>
              <th>cr</th>
              <th>ctp</th>
              <th>ctn</th>
              <th>details</th>
              <th>motif</th>
              <th>cte</th>
              <th>retard</th>
              <th>T</th>
              <th>status</th>
              <th>paid Hour</th>
            </tr>
          </thead>
          <tbody>
            {p.data.employees.map((m) => (
              <tr>
                <th>{m.matricule}</th>
                <th>{m.poste}</th>
                <th>{m.pointing}</th>
                <th>add. pointing</th>
                <th>{m.ot}</th>
                <th>{m.cr}</th>
                <th>m.ctp</th>
                <th>{m.ctn.toFixed(2)}</th>
                <th>{m.details}</th>
                <th>{m.motif}</th>
                <th>{m.cte}</th>
                <th>{m.retard}</th>
                <th>{m.t}</th>
                <th>{m.status}</th>
                <th>{m.paidHour.toFixed(2)}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <img className={c.imglg} src={lg} alt="logo" />
    </div>
  );
};

export default ProductionCardDetails;
