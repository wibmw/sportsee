import { IUserInfos } from '../api/Interfaces'
import { FC } from 'react'

const TopMessage: FC<IUserInfos> = ({ firstName, lastName }) => {
  return (
    /** *********** Banner Component ******************/
    <article className='top_message'>
      {/** *********** Banner Image ******************/}
      <h1 className='top_message_name'>
        Bonjour <span>{firstName + ' ' + lastName}</span>
      </h1>
      {/** *********** Banner Text ******************/}
      <p className='top_message_text'>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
    </article>
  )
}

export default TopMessage
