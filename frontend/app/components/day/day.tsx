import { dayToDayname } from '~/utils/date'

import './style.css'

export default function Day({date}: {date: Date}){
  let hourComponents = []
  for (let i = 0; i < 24; i++){
    hourComponents[i] = <p className='hour'>{i}</p>
  }

  return <div className='day'>
    <p style={{backgroundColor: 'rgba(190, 0, 149, 0.46)'}}>{dayToDayname(date.getDay())}</p>
    <p style={{backgroundColor: 'rgba(190, 0, 149, 0.22)'}}>{String(date.getDate()).padStart(2, '0')}</p>
    {...hourComponents}
  </div>
}