import erase_icon from '~/assets/erase.jpg'
import draw_icon from '~/assets/draw.jpg'

export default function BrushSelect({brush, setBrush}: {brush: string, setBrush: React.Dispatch<React.SetStateAction<string>>}){
  return <div style={{display: 'flex', width: 'fit-content'}}>
    <img 
      style={{...(brush != 'draw' && {opacity: 0.5})}} 
      onClick={() => {setBrush('draw')}}
      src={draw_icon}
    />
    <img 
      style={{...(brush != 'erase' && {opacity: 0.5})}} 
      onClick={() => {setBrush('erase')}}
      src={erase_icon}
    />
  </div>
}