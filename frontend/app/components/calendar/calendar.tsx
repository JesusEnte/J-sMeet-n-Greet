import { useState } from 'react'

import WeekSelector from '~/components/week_selector/week_selector'
import Week from '~/components/week/week'

import { dateToMonday } from '~/utils/date'

import './style.css'

export default function Calendar(){
  const [date, setDate] = useState(dateToMonday(new Date()))
  return <div className='calendar'>
    <WeekSelector date={date} setDate={setDate}/>
    <Week startDate={date}/>
  </div>
}