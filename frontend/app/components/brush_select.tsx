import draw_icon from '~/assets/draw.png'
import erase_icon from '~/assets/erase.png'

export default function BrushSelect({brush, setBrush, active}: {brush: string, setBrush: React.Dispatch<React.SetStateAction<string>>, active: boolean}){

  return <div style={{display: 'flex', width: 'fit-content', ...(!active && {borderColor: 'gray'})}}>
    <img 
      style={{...((brush != 'draw' || !active) && {opacity: 0.5})}} 
      onClick={() => {setBrush('draw')}}
      src={draw_icon}
    />
    <img 
      style={{...((brush != 'erase' || !active) && {opacity: 0.5})}} 
      onClick={() => {setBrush('erase')}}
      src={erase_icon}
    />
  </div>
}