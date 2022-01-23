import styles from './modal.module.css';
import { MultiSelect } from 'react-multi-select-component';
import { useEffect, useState } from 'react';
const baseURL = 'http://localhost:3001';

const Modal = ({ day, month, year, onClose, onSuccess }) => {
    const [ucesnici, setUcesnici] = useState([]);

    const [selected, setSelected] = useState([]);
    useEffect(() => {
        async function getUcesnici() {
            const res = await fetch(baseURL + '/participants');
            const data = await res.json();
            setUcesnici(data.map((u) => ({ label: u.ime, value: u._id })));
        }
        getUcesnici();
    }, []);

    const addEvent = async (event) => {
        event.preventDefault();

        const naziv = event.target.naziv.value;
        const opis = event.target.opis.value;
        const vreme = event.target.vreme.value;
        const ucesnici = selected.map((x) => x.value);
        const newEvent = {
            naziv,
            opis,
            vreme,
            ucesnici,
            day,
            month,
            year,
        };
        const res = await fetch(baseURL + '/events', {
            body: JSON.stringify(newEvent),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });

        const result = await res.json();
        onSuccess(result);
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
                <div className={styles.title}>Novi dogadjaj</div>
                <br />
                <form onSubmit={addEvent}>
                    <br />
                    <div>
                        <label>Naslov: </label>
                        <input type='text' placeholder='Unesite naslov' name='naziv' id='naziv' />
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
                        <label>Izaberite ucesnike:z</label>
                        <br />
                        <br />
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
