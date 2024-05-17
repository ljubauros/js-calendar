import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getParticipant, getEvent, deleteEvent } from '../../api/apiService';

const Details = () => {
    const router = useRouter();
    const { eventId } = router.query;
    const [event, setEvent] = useState();
    const [participants, setParticipants] = useState();

    async function fetchParticipants(participantsIds) {
        const participants = await Promise.all(participantsIds.map((id) => getParticipant(id)));
        setParticipants([...participants]);
    }
    async function fetchEvent() {
        const data = await getEvent(eventId);
        setEvent(data);
        return data;
    }

    useEffect(() => {
        if (!eventId) return;
        fetchEvent().then((data) => {
            fetchParticipants(data.participants);
        });
    }, [eventId]);

    const onDelete = async () => {
        const res = await deleteEvent(eventId);
        if (res == true) router.back();
    };

    return (
        <>
            <h1>Event details</h1>
            <div>
                <br />
                <div>
                    <label style={{ fontWeight: 'bold' }}>Title: </label>
                    <label type='text' name='title' id='title'>
                        {event ? event.title : null}
                    </label>
                </div>
                <br />
                <div>
                    <label style={{ fontWeight: 'bold' }}>Description: </label>
                    <label type='text' name='description' id='description'>
                        {event ? event.description : null}
                    </label>
                </div>
                <br />
                <div>
                    <label style={{ fontWeight: 'bold' }}>Time: </label>
                    <label type='text' name='time' id='time'>
                        {event ? event.time : null}, {event ? event.day : null}.{event ? event.month + 1 : null}.
                        {event ? event.year : null}.
                    </label>
                </div>
                <br />
                <div>
                    <label style={{ fontWeight: 'bold' }}>Participants: </label>
                    {participants && participants.length ? (
                        participants
                            .map((p) => (
                                <span key={p._id}>
                                    {p.firstName} {p.lastName}
                                </span>
                            ))
                            .reduce((p, c) => [p, ', ', c])
                    ) : (
                        <label>No participants</label>
                    )}
                </div>
                <br />
                <button onClick={onDelete} className='button'>
                    Delete
                </button>
            </div>
        </>
    );
};

export default Details;
