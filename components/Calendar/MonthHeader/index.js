import { useContext } from "react";
import styles from "./monthheader.module.css"
import { CalDateContext } from "../../Calendar"

const months = ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"];


const MonthHeader =  ({btnMonthChange}) => {

    const date = useContext(CalDateContext);

    return <div>
            <button className="button" onClick={() => btnMonthChange("left")}>{"<<<"}</button>
            <button className="button" onClick={() => btnMonthChange("right")}>{">>>"}</button>
            <h1 className={styles["month-name"]}>{months[date.getUTCMonth()]} {date.getUTCFullYear()}</h1>
        </div>
}

export default MonthHeader;