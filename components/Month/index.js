import styles from "./month.module.css";
import Week from "../Week";

const weekdays = ["Pon", "Uto", "Sre", "Cet", "Pet", "Sub", "Ned"];

const Month = (props) => {
    let numOfDays = new Date(2022, props.month + 1, 0).getDate();
	
    //0 - pon, 6 - ned
	let fstDay = new Date(2022, props.month, 1).getDay() - 1;
	if (fstDay == -1) fstDay = 6;

	const days = [];
	for (let i = 0; i < 42; i++) {
		while (fstDay > 0) {
			days.push('\u00A0');
			fstDay--;
		}
		days.push(`${i + 1}`);
		if (i == numOfDays - 1) {
			while (i < 42) {
				days.push('\u00A0');
				i++;
			}
		}
	}

	const weeks = [];
	for (let i = 0; i < 6; i++) {
		weeks.push([]);
		for (let j = 0; j < 7; j++) {
			weeks[i].push(days[i * 7 + j]);
		}
	}
    if (weeks[5][0] == '\u00A0') weeks.pop();

	return (
		<div>
			<table className={styles.table}>
				<thead>
					<tr>
						{weekdays.map((day, i) => (
							<th key={i}>{day}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{weeks.map((week, i) => {
						return <Week week={week} key={i} />;
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Month;