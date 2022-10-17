import { IUser } from './Interfaces'

/**
 * User Class
 * @class User
 * @typedef {User}
 */
class User {
  private readonly _user: IUser

  /**
   * Creates an instance of User.
   * @constructor
   */
  constructor() {
    this._user = {
      userInfos: { firstName: '', lastName: '', age: 0 },
      todayScore: 0,
      keyData: { calorieCount: 0, proteinCount: 0, carbohydrateCount: 0, lipidCount: 0 },
      sessionsAverage: [{ day: 0, sessionLength: 0 }],
      sessionsActivity: [{ day: '1901-01-01', kilogram: 0, calories: 0 }],
      performances: [{ value: 0, kind: '' }],
    }
  }

  /**
   * Get User personnal Datas
   * @method
   * @param {IUserInfos} userInfos
   * @returns {User}
   */
  userInfos(userInfos): User {
    if (userInfos && userInfos) this._user.userInfos = userInfos
    return this
  }

  /**
   * Get Today Score Datas
   * @method
   * @param {number} todayScore
   * @returns {User}
   */
  todayScore(todayScore): User {
    if (todayScore && todayScore) this._user.todayScore = todayScore
    return this
  }

  /**
   * Description placeholder
   * @method
   * @param {IKeyData} keyData
   * @returns {User}
   */
  keyData(keyData): User {
    if (keyData && keyData) this._user.keyData = keyData
    return this
  }
  //

  /**
   * Get Sessions Average Datas
   * @method
   * @param {IAverageSessions[]} sessionsAverage
   * @returns {User}
   */
  sessionsAverage(sessionsAverage): User {
    if (sessionsAverage && sessionsAverage) this._user.sessionsAverage = sessionsAverage
    return this
  }

  /**
   * Get Sessions Activity Datas
   * @method
   * @param {IActivitySession[]} sessionsActivity
   * @returns {User}
   */
  sessionsActivity(sessionsActivity): User {
    if (sessionsActivity && sessionsActivity) this._user.sessionsActivity = sessionsActivity
    return this
  }

  /**
   * Get Performance Datas
   * @method
   * @param {IValues[]} performances
   * @returns {User}
   */
  performances(performances): User {
    if (performances && performances) this._user.performances = performances
    return this
  }

  /**
   * Returns the entire User
   * @method
   * @returns {IUser}
   */
  build(): IUser {
    return this._user
  }
}

export default User
