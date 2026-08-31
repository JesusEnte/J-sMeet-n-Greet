import { useRef } from "react"

import { dateToMonday, dateToShortISO } from "~/utils/date"

import './style.css'

export default function WeekSelector({date, setDate}: {date: Date, setDate: React.Dispatch<React.SetStateAction<Date>>}){
  const inputRef = useRef<HTMLInputElement>(null)

  return <div className='weekSelector'>
    <button
      onClick={() => {
        let newDate = new Date(date)
        newDate.setDate(date.getDate() - 7)
        newDate = dateToMonday(newDate)
        setDate(newDate)
      }}
    >&lt;</button>
    <input 
      ref={inputRef} 
      type='date'
      value={dateToShortISO(date)}
      onChange={() => {
        setDate(dateToMonday(inputRef.current!.valueAsDate!))
      }}
    />
    <button
      onClick={() => {
        let newDate = new Date(date)
        newDate.setDate(date.getDate() + 7)
        newDate = dateToMonday(newDate)
        setDate(newDate)
      }}
    >&gt;</button>
  </div>
}