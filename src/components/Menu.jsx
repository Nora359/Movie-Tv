import GenreDropdown from "./GenreDropdown";
import { NavLink } from "react-router-dom";
import { RiHeart2Line } from "react-icons/ri";
import "./Menu.css"; // قم بإضافة ملف CSS الجديد

export default function Menu() {
  return (
    <div className="menu-container">
      <ul className="menu-list">
        <li className="relative">
          <GenreDropdown mediaType={"tv"} />
        </li>
        <li className="relative">
          <GenreDropdown mediaType={"movie"} />
        </li>
        <li>
          <NavLink className="list" to={"/watchlist"}>
            <RiHeart2Line size={24} />
            <span>Watchlist</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
