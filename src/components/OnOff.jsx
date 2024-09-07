import { useState } from "react";
import styles from "./OnOff.module.css";

export default function OnOff({ opt, stateChanger }) {
  const [active, setActive] = useState(true);

  const handleClick = () => {
    if (active) {
      setActive(false);
      stateChanger(opt[1].value);
    } else {
      setActive(true);
      stateChanger(opt[0].value);
    }
  };

  return (
    <div className={`${styles.container} sm ${styles.container} md`}>
      <span
        className={`${styles.option} ${active ? styles.active : styles.inactive}`}
        onClick={handleClick}
      >
        {opt[0].name}
      </span>
      <span
        className={`${styles.option} ${!active ? styles.active : styles.inactive}`}
        onClick={handleClick}
      >
        {opt[1].name}
      </span>
    </div>
  );
}
