import { useContext, use, useTransition, useState } from 'react'

import { dayGet, dayUpdate } from '~/api/days'
import { dayToDayname } from '~/utils/date'

import SessionIdContext from '~/contexts/session_id'
import UserIdContext from '~/contexts/user_id'
import BrushContext from '~/contexts/brush'

import './style.css'

export default function Day({date}: {date: Date}){
  const [, startTransition] = useTransition()

  const session_id = useContext(SessionIdContext)
  const user_id = useContext(UserIdContext)
  const brush = useContext(BrushContext)
  
  const day = use(dayGet(session_id, user_id, date))
  let hours = day.hours
  
  function onHourEdit(i: number) {
    if (brush == 'draw') {
      hours = hours | (1 << i)
    } else if (brush == 'erase') {
      hours = hours & ~(1 << i)
    }
  }

  let hourComponents = []
  for (let i = 0; i < 24; i++){
    const hour = (hours >> i) & 1
    hourComponents[i] = <p 
      className={hour ? 'availableHour' : 'busyHour'}
      onMouseOver={(event) => {
        if (event.buttons != 1) return
        onHourEdit(i)
      }}
      onMouseDown={() => {
        onHourEdit(i)
      }}
    >
      {i}
    </p>
  }

  return <div className='day'
    onMouseUp={() => {
      if (user_id == 'all') return
      startTransition(async () => {
        await dayUpdate(session_id, user_id, date, hours)
      })
    }}
  >
    <p style={{backgroundColor: 'rgba(190, 0, 149, 0.46)'}}>{dayToDayname(date.getDay())}</p>
    <p style={{backgroundColor: 'rgba(190, 0, 149, 0.22)'}}>{String(date.getDate()).padStart(2, '0')}</p>
    {...hourComponents}
  </div>
}