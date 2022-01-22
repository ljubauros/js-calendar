import Link from 'next/link';

const Event = ({ event }) => {
    return (
        <Link href={`/sastanak/${event._id}`}>
            <a>
                <div className='event'>{event.naziv}</div>
            </a>
        </Link>
    );
};

export default Event;
