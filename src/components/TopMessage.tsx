import { IUserInfos, userInfosProps } from '../api/Interfaces'

const TopMessage = (userInfos: userInfosProps) => {
  console.log(firstName + ' /n' + lastName + ' /n' + age)

  return (
    /** *********** Banner Component ******************/
    <article className='top_message'>
      {/** *********** Banner Image ******************/}
      <h1 className='top_message_name'>
        Bonjour <span>{firstName + ' ' + lastName + ' ' + age}</span>
      </h1>
      {/** *********** Banner Text ******************/}
      <p className='top_message_text'>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
    </article>
  )
}

export default TopMessage
