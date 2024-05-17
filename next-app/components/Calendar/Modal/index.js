import styles from './modal.module.css';
import { MultiSelect } from 'react-multi-select-component';
import { useEffect, useState } from 'react';
import { getParticipants, postEvent } from '../../../api/apiService';

const Modal = ({ day, month, year, onClose, onSuccess }) => {
    const [participants, setParticipants] = useState([]);

    const [selected, setSelected] = useState([]);
    useEffect(() => {
        async function fetchParticipants() {
            const data = await getParticipants();
            setParticipants(data.map((u) => ({ label: u.firstName, value: u._id })));
        }
        fetchParticipants();
    }, []);

    const addEvent = async (event) => {
        event.preventDefault();

        const title = event.target.title.value;
        const description = event.target.description.value;
        const time = event.target.time.value;
        const participants = selected.map((x) => x.value);
        const newEvent = {
            title,
            description,
            time,
            participants,
            day,
            month,
            year,
        };
        const res = await postEvent(newEvent);
        onSuccess(res);
        onClose();
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.modal}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className={styles.title}>New event</div>
                <br />
                <form onSubmit={addEvent}>
                    <br />
                    <div>
                        <label>Title: </label>
                        <input type='text' placeholder='Enter title' name='title' id='title' />
                    </div>
                    <br />
                    <div>
                        <label>Description: </label>
                        <textarea
                            type='text'
                            placeholder='Enter description'
                            name='description'
                            id='description'
                        ></textarea>
                    </div>
                    <br />
                    <div>
                        <label>Time: </label>
                        <input type='text' placeholder='Enter time' name='time' id='time' />
                    </div>
                    <br />
                    <div>
                        <label>Choose participants:</label>
                        <br />
                        <br />
                        <MultiSelect
                            options={participants}
                            value={selected}
                            onChange={setSelected}
                            labelledBy='Select'
                        />
                    </div>
                    <br />
                    <button type='submit' className='button'>
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
