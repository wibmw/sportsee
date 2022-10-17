import { IUserInfos } from '../../../api/Interfaces'

/**
 * React Component: Returns the Top Message Section
 *
 * @module
 * @param {IUserInfos} { firstName }
 * @returns {*}
 */
const TopMessage = ({ firstName }: IUserInfos) => {
  return (
    /** *********** Top Message Section ******************/
    <article className='top_message'>
      {/** *********** Hello + Name ******************/}
      <h1 className='top_message_name'>
        Bonjour <span>{firstName}</span>
      </h1>
      {/** *********** Text Message ******************/}
      <p className='top_message_text'>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
    </article>
  )
}

export default TopMessage
