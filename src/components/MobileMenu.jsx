import GenreDropdown from "./GenreDropdown";
import { NavLink } from "react-router-dom";
import { RiHeart2Line } from "react-icons/ri";
import styles from "./MobileMenu.module.css";

export default function MobileMenu({ expanded, setExpanded }) {
  return (
    <div
      className={`${styles.menuContainer} ${
        expanded ? styles.visible : styles.hidden
      }`}
    >
      <ul className={`${styles.menuList} sm:w-[50vw] md:w-[30vw]`}>
        <li className={styles.menuItem}>
          <GenreDropdown mediaType={"tv"} setExpanded={setExpanded} />
        </li>
        <li className={styles.menuItem}>
          <GenreDropdown mediaType={"movie"} setExpanded={setExpanded} />
        </li>
        <li className={styles.menuItem}>
          <NavLink
            className={styles.navLink}
            to={"/watchlist"}
            onClick={() => setExpanded(false)}
          >
            <RiHeart2Line className={styles.icon} />
            <span>Watchlist</span>
          </NavLink>
        </li>
        <li className={styles.menuItem}>
          {/* Additional menu items can be added here */}
        </li>
      </ul>
    </div>
  );
}
