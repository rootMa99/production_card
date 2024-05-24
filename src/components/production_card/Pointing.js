import React from "react";
import c from "./Pointing.module.css";

const Pointing = (p) => {
  const onClickHandler = (e, t) => {
    console.log(t);
  };

  return (
    <div className={c.container}>
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
    </div>
  );
};

export default Pointing;
