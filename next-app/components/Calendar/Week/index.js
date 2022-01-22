import Day from '../Day';

const Week = ({ week, addEvent, events }) => {
    return (
        <tr>
            {week.map((day, i) => (
                <Day day={day} events={events.filter((event) => event.day == day)} addEvent={addEvent} key={i} />
            ))}
        </tr>
    );
};

export default Week;
