import { IActivityItem } from '../api/Interfaces'
import { FC } from 'react'

const ActivityItem: FC<IActivityItem> = ({ icon, value, name, unit }) => {
  const thousandsSeparator = (num: number) => {
    const numParts = num.toString().split('.')
    numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return numParts.join('.')
  }

  const kiloUnit = (value: number, unit: string) => {
    return value > 1000 ? 'k' + unit.charAt(0).toUpperCase() + unit.slice(1) : unit
  }

  return (
    /** *********** Banner Component ******************/
    <article className='activity_item'>
      {/** *********** Banner Image ******************/}
      <img src={icon} className='activity_item_icon' />
      {/** *********** Banner Text ******************/}
      <div className='activity_item_text'>
        <p>{thousandsSeparator(value) + kiloUnit(value, unit)}</p>
        <h3>{name}</h3>
      </div>
    </article>
  )
}

export default ActivityItem
