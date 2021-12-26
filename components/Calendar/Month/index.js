import styles from './month.module.css';
import Week from '../Week';
import { CalDateContext } from '../../Calendar';
import { useContext, useEffect, useState } from 'react';

const weekdays = ['Pon', 'Uto', 'Sre', 'Cet', 'Pet', 'Sub', 'Ned'];

const Month = () => {
    const [events, setEvents] = useState([]);
    const date = useContext(CalDateContext);

    useEffect(() => {
        setEvents([]);
        fetch(`http://localhost:3000/events?month=${date.getUTCMonth()}&year=${date.getUTCFullYear()}`)
            .then((res) => res.json())
            .then((json) => setEvents([...json]));
    }, [date]);

    let numOfDays = new Date(date.getUTCFullYear(), date.getUTCMonth() + 1, 0).getUTCDate();

    //0 - pon, 6 - ned
    let fstDay = new Date(date.getUTCFullYear(), date.getUTCMonth(), 1).getUTCDay();
    if (fstDay == -1) fstDay = 6;

    const days = [];
    for (let i = 0; i < 42; i++) {
        while (fstDay > 0) {
            days.push('\u00A0');
            fstDay--;
        }
        days.push(`${i + 1}`);
        if (i == numOfDays) {
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
                <thead className={styles.thead}>
                    <tr>
                        {weekdays.map((day, i) => (
                            <th key={i}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {weeks.map((week, i) => {
                        return (
                            <Week
                                week={week}
                                events={events.filter((event) => event.day >= week[0] && event.day <= week[6])}
                                key={i}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Month;
