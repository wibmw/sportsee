import { getDatas } from './Api'
import User from './User'
import { IUserInfos, IKeyData, IAverageSessions, IActivitySession, IValues } from './Interfaces'

/**
 * Service Class
 * @class Service
 * @typedef {Service}
 */
class Service {
  private readonly _id: string

  /**
   * Creates an instance of Service.
   * @constructor
   * @param {string} id
   */
  constructor(id: string) {
    this._id = id
  }

  /**
   *  Get User personnal Datas
   * @returns {IUserInfos}
   */
  getUserInfos(): IUserInfos {
    const userInfos = getDatas(this._id, '', 'userInfos')
    return userInfos
  }

  /**
   * Get Today Score Datas
   * @returns {number}
   */
  getTodayScore(): number {
    const todayScore = getDatas(this._id, '', this._id === '18' ? 'score' : 'todayScore')
    return todayScore
  }

  /**
   * Get Key Datas
   * @returns {IKeyData}
   */
  getKeyData(): IKeyData {
    const keyData = getDatas(this._id, '', 'keyData')
    return keyData
  }

  /**
   * Get Sessions Average Datas
   * @returns {IAverageSessions[]}
   */
  getSessionsAverage(): IAverageSessions[] {
    const sessions = getDatas(this._id, '/average-sessions', 'sessions')
    return sessions
  }

  /**
   * Get Sessions Activity Datas
   * @returns {IActivitySession[]}
   */
  getSessionsActivity(): IActivitySession[] {
    const sessions = getDatas(this._id, '/activity', 'sessions')
    return sessions
  }

  /**
   * Get Performances Datas
   * @returns {IValues[]}
   */
  getPerformances() {
    const data: [] = getDatas(this._id, '/performance', 'data')
    const kinds = getDatas(this._id, '/performance', 'kind')
    const performances: IValues[] = []

    data &&
      data.map((perf: IValues) => {
        performances.push({ value: perf && perf.value, kind: kinds && kinds[perf.kind] })
      })

    return performances // ? performances : []
  }

  /**
   * Return All Datas
   * @returns {IUser}
   */
  getAllDatas() {
    const user = new User()

    user.userInfos(this.getUserInfos())
    user.todayScore(this.getTodayScore())
    user.keyData(this.getKeyData())
    user.sessionsActivity(this.getSessionsActivity())
    user.sessionsAverage(this.getSessionsAverage())
    user.performances(this.getPerformances())

    return user.build()
  }
}

export default Service
