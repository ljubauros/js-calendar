import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getParticipant, getEvent, deleteEvent } from '../../api/apiService';

const Details = () => {
    const router = useRouter();
    const { idSastanka } = router.query;
    const [event, setEvent] = useState();
    const [participants, setParticipants] = useState();

    async function fetchParticipants(participantsIds) {
        const participants = await Promise.all(participantsIds.map((id) => getParticipant(id)));
        setParticipants([...participants]);
    }
    async function fetchEvent() {
        const data = await getEvent(idSastanka);
        setEvent(data);
        return data;
    }

    useEffect(() => {
        if (!idSastanka) return;
        fetchEvent().then((data) => {
            fetchParticipants(data.ucesnici);
        });
    }, [idSastanka]);

    const onDelete = async () => {
        const res = await deleteEvent(idSastanka);
        if (res == true) router.back();
    };

    return (
        <>
            <h1>Detalji dogadjaja</h1>
            <div>
                <br />
                <div>
                    <label style={{ fontWeight: 'bold' }}>Naslov: </label>
                    <label type='text' name='naziv' id='naziv'>
                        {event ? event.naziv : null}
                    </label>
                </div>
                <br />
                <div>
                    <label style={{ fontWeight: 'bold' }}>Opis: </label>
                    <label type='text' name='opis' id='opis'>
                        {event ? event.opis : null}
                    </label>
                </div>
                <br />
                <div>
                    <label style={{ fontWeight: 'bold' }}>Vreme: </label>
                    <label type='text' name='vreme' id='vreme'>
                        {event ? event.vreme : null}, {event ? event.day : null}.{event ? event.month + 1 : null}.
                        {event ? event.year : null}.
                    </label>
                </div>
                <br />
                <div>
                    <label style={{ fontWeight: 'bold' }}>Ucesnici: </label>
                    {participants && participants.length ? (
                        participants
                            .map((p) => (
                                <span key={p._id}>
                                    {p.ime} {p.prezime}
                                </span>
                            ))
                            .reduce((p, c) => [p, ', ', c])
                    ) : (
                        <label>Nema ucesnika</label>
                    )}
                </div>
                <br />
                <button onClick={onDelete} className='button'>
                    Obrisi
                </button>
            </div>
        </>
    );
};

export default Details;
