import styles from './day.module.css';
import { CalDateContext } from '../../Calendar';
import { useContext, useState, useEffect } from 'react';
import Modal from '../Modal';
import Event from './Event';

const Day = ({ day, events }) => {
    const [openModal, setOpenModal] = useState(false);
    const calDate = useContext(CalDateContext);
    const currDate = new Date();

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
        )
            return true;
        return false;
    };

    return (
        <td className={isToday() ? styles.today : styles.day} onDoubleClick={handleDoubleClick}>
            {day}
            <div>
                {events?.map((event, i) => {
                    return <Event event={event} key={i} />;
                })}
            </div>
            {openModal && <Modal onClose={onModalClose} />}
        </td>
    );
};

export default Day;
