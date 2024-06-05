import { NavLink } from "react-router-dom";
import c from "./List.module.css";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/loginSlice";
const List = (p) => {
  const dispatch = useDispatch();

  const onClickHandler = (e) => {
    p.click();
  };

  return (
    <ul className={c.linkHolder} onClick={onClickHandler}>
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
