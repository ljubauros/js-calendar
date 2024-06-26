import styles from './month.module.css';
import Week from '../Week';
import { CalDateContext } from '../../Calendar';
import { useContext, useEffect, useState } from 'react';
import { getEvents } from '../../../api/apiService';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Month = () => {
    const [events, setEvents] = useState([]);
    const date = useContext(CalDateContext);
    const [loading, setLoading] = useState(false);
    const addEvent = (event) => {
        setEvents([...events, event]);
    };

    useEffect(() => {
        setLoading(true);
        getEvents(date.getUTCMonth(), date.getUTCFullYear()).then((res) => {
            setEvents([...res]);
            setLoading(false);
        });
    }, [date]);

    let numOfDays = new Date(date.getUTCFullYear(), date.getUTCMonth() + 1, 0).getUTCDate();

    //0 - Mon, 6 - Sun
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
    if (weeks[weeks.length - 1][0] == '\u00A0') {
        weeks.pop();
    }
    if (loading) {
        return <div>Loading...</div>;
    }
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
                                events={events.filter((event) => week.includes(String(event.day)))}
                                addEvent={addEvent}
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
