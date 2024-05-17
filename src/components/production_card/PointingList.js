import c from "./PointingList.module.css";

const PointingList = (p) => {
  return (
    <div className={c.container}>
      <ul className={c.ulemp}>
        <li
          style={{
            backgroundColor: "#F84018",
            color: "#E5E1DA",
            fontWeight: "600",
            padding: "5px",
          }}
        >
          <span style={{ width: "10%" }}>matricule</span>
          <span style={{ width: "10%" }}>poste</span>
          <span style={{ width: "10%" }}>pointing</span>
          <span style={{ width: "10%" }}>hours</span>
          <span style={{ width: "10%" }}>status</span>
        </li>
        {p.data.map((m) => (
          <li key={m.matricule}>
            <span style={{ width: "10%" }}>{m.matricule}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PointingList;
