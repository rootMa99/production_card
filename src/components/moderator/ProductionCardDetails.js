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
      <h3 className={c.pointingListd}>pointing list:</h3>
      <div className={c.pointingList}>
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
                <td style={{color:"#FFA211", fontWeight:"900", fontSize:"17px"}}>{m.matricule}</td>
                <td>{m.poste}</td>
                <td style={{color:"#006B63", fontWeight:"900"}}>{m.pointing}</td>
                <td>add. pointing</td>
                <td>{m.ot}</td>
                <td>{m.cr}</td>
                <td>m.ctp</td>
                <td>{m.ctn.toFixed(2)}</td>
                <td>{m.details}</td>
                <td>{m.motif}</td>
                <td>{m.cte}</td>
                <td>{m.retard}</td>
                <td>{m.t}</td>
                <td>{m.status}</td>
                <td style={{color:"#FFA211", fontWeight:"900", fontSize:"17px"}}>{m.paidHour.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tfoot>
        </table>
      </div>
      <img className={c.imglg} src={lg} alt="logo" />
    </div>
  );
};

export default ProductionCardDetails;
