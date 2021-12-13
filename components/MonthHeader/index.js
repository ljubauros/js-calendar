import styles from "./monthhandler.module.css"


const MonthHeader = (props) => {

    return <div>
            <button onClick={() => props.btnMonthChange("left")}>{"<<<"}</button>
            <h1 className={styles.inline}>{props.month}</h1>
            <button onClick={() => props.btnMonthChange("right")}>{">>>"}</button>
        </div>
}

export default MonthHeader;