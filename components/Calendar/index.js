import Month from './Month'
import MonthHeader from './MonthHeader'
import {createContext, useState} from 'react'

export const CalDateContext = createContext(new Date())

const Calendar = () => {
    const [currDate, setCurrDate] = useState(new Date())
    const [calDate, setCalDate] = useState(new Date())

    const monthChange = (s) => {
        const date = new Date(calDate)
        if(s == "left"){
            date.setUTCMonth(date.getUTCMonth() - 1);
            setCalDate(date);
        }else{
            date.setUTCMonth(date.getUTCMonth() + 1);
            setCalDate(date);
        }
    }

    return <>
        <CalDateContext.Provider value = {calDate}>
            <MonthHeader btnMonthChange={monthChange}/>
            <Month/>
        </CalDateContext.Provider>
    </>
}

export default Calendar;