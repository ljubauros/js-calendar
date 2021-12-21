import styles from "./day.module.css";
import { CalDateContext } from "../../Calendar";
import { useContext } from "react";
import { useState } from "react/cjs/react.development";
import Modal from "../Modal";
import Event from "./Event";

const dbEvents = [{id: 1, naslov: "e1", opis: "prvi dogadjaj", day: 2, month: 11, year: 2021}, 
                  {id: 2, naslov: "e2", opis: "drugi dogadjaj", day: 5, month: 11, year: 2021}, 
                  {id: 3, naslov: "e3", opis: "treci dogadjaj", day: 2, month: 11, year: 2021},
                  {id: 4, naslov: "e4", opis: "cetvrti dogadjaj", day: 21, month: 11, year: 2021}];

const Day = ({ day }) => {
    const [openModal, setOpenModal] = useState(false);
    const calDate = useContext(CalDateContext);
    const currDate = new Date();
    
	const getEvents = (day, month, year) => {
		return dbEvents.filter(event => event.day == day && event.month == month && event.year == year);
	};

	const handleDoubleClick = () => {
		setOpenModal(true);
	};

	const onModalClose = () => {
		setOpenModal(false);
	};

    const isToday = () => {
        if (
            day == currDate.getUTCDate() &&
            calDate.getUTCMonth() == currDate.getUTCMonth() &&
            calDate.getUTCFullYear() == currDate.getUTCFullYear()
        ) return true;
        return false;
    }

    const events = getEvents(day, calDate.getUTCMonth(), calDate.getUTCFullYear());

    return (
        <td className={isToday() ? styles.today : styles.day} onDoubleClick={handleDoubleClick}>
            {day}
            <div>{events?.map((event, i) => {
                return <Event event={event} key={i}/>
            })}</div>
            {openModal && <Modal onClose={onModalClose} />}
        </td>
    );
};

export default Day;
