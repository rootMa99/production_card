import { NavLink } from "react-router-dom";
import c from "./List.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../store/loginSlice";
import React from "react";
const List = (p) => {
  const { isLoged } = useSelector((s) => s.login);
  const dispatch = useDispatch();

  const onClickHandler = (e) => {
    p.click();
  };

  return (
    <ul className={c.linkHolder} onClick={onClickHandler}>
      {isLoged.role === "Teamleader" && (
        <React.Fragment>
          <li className={c.linkOne} onClick={onClickHandler}>
            <NavLink
              to="cp"
              className={({ isActive }) => (isActive ? c.activeLink : c.link)}
            >
              production card
            </NavLink>
          </li>
          <li className={c.linktwo} onClick={onClickHandler}>
            <NavLink
              to="/dhc"
              className={({ isActive }) => (isActive ? c.activeLink : c.link)}
            >
              overtime
            </NavLink>
          </li>
          <li className={c.linktwo} onClick={onClickHandler}>
            <NavLink
              to="/mth"
              className={({ isActive }) => (isActive ? c.activeLink : c.link)}
            >
              mutation history
            </NavLink>
          </li>
        </React.Fragment>
      )}
      {isLoged.role === "Moderator" && (
        <React.Fragment>
          <li className={c.linktwo} onClick={onClickHandler}>
            <NavLink
              to="/home"
              className={({ isActive }) => (isActive ? c.activeLink : c.link)}
            >
              home
            </NavLink>
          </li>
          <li className={c.linktwo} onClick={onClickHandler}>
            <NavLink
              to="/abstloo"
              className={({ isActive }) => (isActive ? c.activeLink : c.link)}
            >
              data Abs & tlo & output
            </NavLink>
          </li>
          <li className={c.linktwo} onClick={onClickHandler}>
            <NavLink
              to="/mh"
              className={({ isActive }) => (isActive ? c.activeLink : c.link)}
            >
              Mutation history
            </NavLink>
          </li>
        </React.Fragment>
      )}
      <li
        className={`${c.linktwo} ${c.logout}`}
        onClick={() => {
          dispatch(loginActions.logout());
        }}
      >
        logout
      </li>
    </ul>
  );
};
export default List;
