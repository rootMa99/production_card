import { NavLink } from "react-router-dom";
import c from "./List.module.css"

const List=p=>{

    const onClickHandler=e=>{
        p.click()
    }

    return(
        <ul className={c.linkHolder} onClick={onClickHandler}>
          <li className={c.linkOne} onClick={onClickHandler}>
            <NavLink
              to="cp"
              className={({ isActive }) => (isActive ? c.activeLink : c.link)}
            >
              card production
            </NavLink>
          </li>
          <li className={c.linktwo} onClick={onClickHandler}>
            <NavLink
              to="/dhc"
              className={({ isActive }) => (isActive ? c.activeLink : c.link)}
            >
              dh control
            </NavLink>
          </li>
          <li className={`${c.linktwo} ${c.logout}`} onClick={onClickHandler}>
              logout        
          </li>
        </ul>
    )

}
export default List;