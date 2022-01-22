import Link from 'next/link';

const Event = ({ event }) => {
    return (
        <Link href={`/sastanak/${event.id}`}>
            <a>
                <div className='event'>{event.opis}</div>
            </a>
        </Link>
    );
};

export default Event;
