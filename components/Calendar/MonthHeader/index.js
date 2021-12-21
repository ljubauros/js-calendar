import { useContext } from "react";
import styles from "./monthheader.module.css"
import { CalDateContext } from "../../Calendar"

const months = ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"];


const MonthHeader =  ({btnMonthChange}) => {

    const date = useContext(CalDateContext);

    return <div>
            <button onClick={() => btnMonthChange("left")}>{"<<<"}</button>
            <h1 className={styles.inline}>{months[date.getUTCMonth()]} {date.getUTCFullYear()}</h1>
            <button onClick={() => btnMonthChange("right")}>{">>>"}</button>
        </div>
}

export default MonthHeader;