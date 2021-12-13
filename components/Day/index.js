import styles from "./day.module.css";

const Day = (props) => {

    return <td className={styles.td}>{props.day}</td>
}

export default Day;