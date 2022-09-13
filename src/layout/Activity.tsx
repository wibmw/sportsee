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
      <ActivityItem icon={proteinIcon} value={calorieCount} name='Calories' />
      <ActivityItem icon={caloriesIcon} value={proteinCount} name='Protéines' />
      <ActivityItem icon={carbsIcon} value={carbohydrateCount} name='Glucides' />
      <ActivityItem icon={fatIcon} value={lipidCount} name='Lipides' />
    </div>
  )
}

export default Activity
