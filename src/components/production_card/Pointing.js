import React, { useState } from "react";
import c from "./Pointing.module.css";

const Pointing = (p) => {
  const [pc, setPc] = useState(false);
  const [typet, setTypet] = useState({
    t: "",
    title: "",
  });
  const onClickHandler = (e, t) => {
    setPc(true);
    switch (t) {
      case "ab":
        setTypet({
          t: t,
          title: "ABSENT",
        });
        break;
      case "ad":
        setTypet({
          t: t,
          title: "admin",
        });
        break;
      case "ot":
        setTypet({
          t: t,
          title: "ot",
        });
        break;
      case "ma":
        setTypet({
          t: t,
          title: "maladie",
        });
        break;
      case "ctp":
        setTypet({
          t: t,
          title: "ctp",
        });
        break;
      case "ctn":
        setTypet({
          t: t,
          title: "ctn",
        });
        break;
      case "cr":
        setTypet({
          t: t,
          title: "cr",
        });
        break;
      case "t":
        setTypet({
          t: t,
          title: "autorisation",
        });
        break;
      case "tl":
        setTypet({
          t: t,
          title: "autorisation légal",
        });
        break;
      case "retard":
        setTypet({
          t: t,
          title: "retard",
        });
        break;
      case "other":
        setTypet({
          t: t,
          title: "other",
        });
        break;
      default:
    }
  };
  console.log(pc);

  return (
    <div className={c.container}>
      {!pc && (
        <React.Fragment>
          <div
            className={c.cardContainer}
            onClick={(e) => onClickHandler(e, "ab")}
          >
            <div className={c.card}>AB</div>
          </div>
          <div
            className={c.cardContainer}
            onClick={(e) => onClickHandler(e, "ad")}
          >
            <div className={c.card}>Admin</div>
          </div>
          <div
            className={c.cardContainer}
            onClick={(e) => onClickHandler(e, "ot")}
          >
            <div className={c.card}>over time</div>
          </div>
          <div
            className={c.cardContainer}
            onClick={(e) => onClickHandler(e, "ma")}
          >
            <div className={c.card}>ma</div>
          </div>
          <div
            className={c.cardContainer}
            onClick={(e) => onClickHandler(e, "ctp")}
          >
            <div className={c.card}>ctp</div>
          </div>
          <div
            className={c.cardContainer}
            onClick={(e) => onClickHandler(e, "ctn")}
          >
            <div className={c.card}>ctn</div>
          </div>
          <div
            className={c.cardContainer}
            onClick={(e) => onClickHandler(e, "cr")}
          >
            <div className={c.card}>cr</div>
          </div>
          <div
            className={c.cardContainer}
            onClick={(e) => onClickHandler(e, "t")}
          >
            <div className={c.card}>t</div>
          </div>
          <div
            className={c.cardContainer}
            onClick={(e) => onClickHandler(e, "tl")}
          >
            <div className={c.card}>tl</div>
          </div>
          <div
            className={c.cardContainer}
            onClick={(e) => onClickHandler(e, "retard")}
          >
            <div className={c.card}>retard</div>
          </div>
          <div
            className={c.cardContainer}
            onClick={(e) => onClickHandler(e, "other")}
          >
            <div className={c.card}>other</div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Pointing;
