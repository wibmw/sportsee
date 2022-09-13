import { IActivityItem } from '../api/Interfaces'
import { FC } from 'react'

const ActivityItem: FC<IActivityItem> = ({ icon, value, name }) => {
  return (
    /** *********** Banner Component ******************/
    <article className='activity_item'>
      {/** *********** Banner Image ******************/}
      <img src={icon} className='activity_item_icon' />
      {/** *********** Banner Text ******************/}
      <div className='activity_item_text'>
        <p>{value}</p>
        <h3>{name}</h3>
      </div>
    </article>
  )
}

export default ActivityItem
