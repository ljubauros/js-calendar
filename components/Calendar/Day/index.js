import styles from "./day.module.css";
import { CalDateContext } from "../../Calendar";
import { useContext } from "react";

const Day = ({ day }) => {
	const calDate = useContext(CalDateContext);
	const currDate = new Date();
	if (
		day == currDate.getUTCDate() &&
		calDate.getUTCMonth() == currDate.getUTCMonth() &&
		calDate.getUTCFullYear() == currDate.getUTCFullYear()
	)
		return <td className={styles.today}>{day}</td>;
	else {
		return <td className={styles.day}>{day}</td>;
	}
};

export default Day;
