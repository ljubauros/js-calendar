import styles from './day.module.css';
import { CalDateContext } from '../../Calendar';
import { useContext, useState, useEffect } from 'react';
import Modal from '../Modal';
import Event from './Event';

const Day = ({ day, events, addEvent }) => {
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
        <td
            className={isToday() ? styles.today : styles.day}
            onDoubleClick={Number.isInteger(Number.parseInt(day)) ? handleDoubleClick : undefined}
        >
            {day}
            <div>
                {events?.map((event, i) => {
                    return <Event event={event} key={i} />;
                })}
            </div>
            <div>
                {openModal && (
                    <Modal
                        day={parseInt(day)}
                        month={calDate.getUTCMonth()}
                        year={calDate.getUTCFullYear()}
                        onClose={onModalClose}
                        onSuccess={addEvent}
                    />
                )}
            </div>
        </td>
    );
};

export default Day;
