import Link from 'next/link';

const Event = ({ event }) => {
    return (
        <Link href={`/event/${event._id}`}>
            <a>
                <div className='event'>{event.title}</div>
            </a>
        </Link>
    );
};

export default Event;
