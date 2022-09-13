import { IKeyData, IActivityItem } from '../api/Interfaces'
import { FC } from 'react'
import ActivityItem from '../components/ActivityItem'
import proteinIcon from '../assets/images/proteinIcon.png'
import caloriesIcon from '../assets/images/caloriesIcon.png'
import carbsIcon from '../assets/images/carbsIcon.png'
import fatIcon from '../assets/images/fatIcon.png'

const Activity: FC<IKeyData> = ({ calorieCount, proteinCount, carbohydrateCount, lipidCount }) => {
  return (
    /** *********** Banner Component ******************/
    <div className='activity'>
      <ActivityItem icon={proteinIcon} value={calorieCount} name='Calories' unit='cal' />
      <ActivityItem icon={caloriesIcon} value={proteinCount} name='Protéines' unit='g' />
      <ActivityItem icon={carbsIcon} value={carbohydrateCount} name='Glucides' unit='g' />
      <ActivityItem icon={fatIcon} value={lipidCount} name='Lipides' unit='g' />
    </div>
  )
}

export default Activity
