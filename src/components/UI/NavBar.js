import { NavLink } from "react-router-dom";
import c from "./NavBar.module.css";
import imglogo from "../../assets/aptiv-logo.svg";
import { useSelector } from "react-redux";
import React, { useState } from "react";

import List from "./List";
import BackDrop from "./BackDrop"

const NavBar = (p) => {
  const { isLoged } = useSelector((s) => s.login);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const onClickHandler=e=>{
    setIsChecked(false)
  }
  return (
    <React.Fragment>
      <div className={c.navBar}>
        <div className={c.logo}>
          <NavLink to="/cp">
            <img src={imglogo} alt="logo for aptiv" />
          </NavLink>
        </div>
        {isLoged.login && (
          <div className={c.links}>
            <ul>
              <li>
                <label className={c.hamburger}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <svg viewBox="0 0 32 32">
                    <path
                      className={`${c.line} ${c["line-top-bottom"]}`}
                      d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                    ></path>
                    <path className={c.line} d="M7 16 27 16"></path>
                  </svg>
                </label>
              </li>
            </ul>
          </div>
        )}
      </div>
      {isChecked && (
        <List click={onClickHandler} />
      )}
      {isChecked && (
        <BackDrop click={onClickHandler} zindex={10}/> 
      )}
    </React.Fragment>
  );
};
export default NavBar;
