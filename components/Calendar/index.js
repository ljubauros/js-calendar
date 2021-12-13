import Month from '../Month'
import MonthHeader from '../MonthHeader'
import {useState} from 'react'

const months = ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"];

const Calendar = () => {
    const [month, setMonth] = useState(new Date().getMonth())

    const monthChange = (s) => {
        if(s == "left"){
            if(month != 0)
                setMonth(--month);
        }else{
            if(month != 11)
                setMonth(++month);
        }
    }

    return <>
        <MonthHeader month={months[month]} btnMonthChange={monthChange}/>
        <Month month={month}/>
    </>
}

export default Calendar;