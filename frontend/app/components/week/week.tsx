import Day from "~/components/day/day"

import { dateToShortISO } from "~/utils/date"

import './style.css'

export default function Week({startDate}: {startDate: Date}){
  let dayComponents = []
  for (let i = 0; i < 7; i++){
    let date = new Date(startDate)
    date.setDate(startDate.getDate()  + i)
    dayComponents[i] = <Day date={date} key={dateToShortISO(date)}/>
  }
  return <div className="week">
    {...dayComponents}
  </div>
}