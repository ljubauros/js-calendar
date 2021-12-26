import styles from './modal.module.css';
import { MultiSelect } from 'react-multi-select-component';
import { useEffect, useState } from 'react';

const Modal = ({ day, month, year, onClose, onSuccess }) => {
    const [ucesnici, setUcesnici] = useState([]);

    const [selected, setSelected] = useState([]);
    useEffect(() => {
        async function getUcesnici() {
            const res = await fetch('/ucesnici');
            const data = await res.json();
            setUcesnici(data.map((u) => ({ label: u.name, value: u.id })));
        }
        getUcesnici();
    }, []);

    const addEvent = async (event) => {
        event.preventDefault();

        const naslov = event.target.naslov.value;
        const opis = event.target.opis.value;
        const vreme = event.target.vreme.value;
        const ucesnici = selected.map((x) => x.value);
        console.log(selected);
        const res = await fetch('/event', {
            body: JSON.stringify({
                naslov,
                opis,
                vreme,
                ucesnici,
                day,
                month,
                year,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });

        const result = await res.json();
        console.log(result);
        onSuccess(result);
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.modal}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className={styles.title}>Novi dogadjaj</div>
                <form onSubmit={addEvent}>
                    <br />
                    <div>
                        <label>Naslov: </label>
                        <input type='text' placeholder='Unesite naslov' name='naslov' id='naslov' />
                    </div>
                    <br />
                    <div>
                        <label>Opis: </label>
                        <textarea type='text' placeholder='Unesite opis' name='opis' id='opis'></textarea>
                    </div>
                    <br />
                    <div>
                        <label>Vreme: </label>
                        <input type='text' placeholder='Unesite vreme' name='vreme' id='vreme' />
                    </div>
                    <br />
                    <div>
                        <label>Izaberite ucesnike: </label>
                        <MultiSelect options={ucesnici} value={selected} onChange={setSelected} labelledBy='Select' />
                    </div>
                    <br />
                    <button type='submit' className='button'>
                        Dodaj
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
