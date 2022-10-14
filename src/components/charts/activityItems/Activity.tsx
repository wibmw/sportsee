import { IKeyData } from '../../../api/Interfaces'
import ActivityItem from './ActivityItem'
import proteinIcon from '../../../assets/images/activityItems/proteinIcon.png'
import caloriesIcon from '../../../assets/images/activityItems/caloriesIcon.png'
import carbsIcon from '../../../assets/images/activityItems/carbsIcon.png'
import fatIcon from '../../../assets/images/activityItems/fatIcon.png'


/**
 * Description placeholder
 * @date 10/14/2022 - 3:17:56 PM
 *
 * @param {IKeyData} { calorieCount, proteinCount, carbohydrateCount, lipidCount }
 * @returns {*}
 */
const Activity = ({ calorieCount, proteinCount, carbohydrateCount, lipidCount }: IKeyData) => {
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
