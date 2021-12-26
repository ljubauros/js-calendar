import Day from '../Day';

const Week = ({ week, events }) => {
    return (
        <tr>
            {week.map((day, i) => (
                <Day day={day} events={events.filter((event) => event.day == day)} key={i} />
            ))}
        </tr>
    );
};

export default Week;
