import Day from '../Day'

const Week = ({week}) => {
    
    
    return <tr>
        {week.map((day, i) => <Day day={day} key={i}/>)}
    </tr>
}

export default Week;