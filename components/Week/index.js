import Day from '../Day'

const Week = (props) => {
    
    
    return <tr>
        {props.week.map((day, i) => <Day day={day} key={i}/>)}
    </tr>
}

export default Week;