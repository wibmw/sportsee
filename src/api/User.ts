import { getDatas } from './Api'
import {
  IUser,
  IUserInfos,
  IKeyData,
  IAverage,
  IActivitySession,
  IValues,
  IAverageSessions,
} from './Interfaces'

class User {
  protected readonly _id: string
  protected readonly _user: IUser

  constructor(id: string) {
    this._id = id
    this._user = {
      userInfos: { firstName: '', lastName: '', age: 0 },
      todayScore: 0,
      // Todo
      /*
      keyData: { calorieCount: 0, proteinCount: 0, carbohydrateCount: 0, lipidCount: 0 },
      sessionsAverage: [{ day: 0, sessionLength: 0 }],
      sessionsActivity: [{ day: '1901-01-01', kilogram: 0, calories: 0 }],
      performances: [{ value: 0, kind: '' }],
      */
    }
  }
  // Get User personnal Datas
  getUserInfos(): User {
    const userInfos = getDatas(this._id, 'userInfos')
    this._user.userInfos = userInfos && userInfos
    return this
  }
  // Get Today Score Datas
  getTodayScore(): User {
    const todayScore = getDatas(this._id, 'todayScore')
    this._user.todayScore = todayScore && todayScore
    return this
  }

  // Todo : Get Key Datas
  getKeyData(): IKeyData { // :User
    const keyData = getDatas(this._id, 'keyData')
    // this._user.keyData = keyData && keyData
    // return this
    return keyData
      ? keyData
      : ({ calorieCount: 0, proteinCount: 0, carbohydrateCount: 0, lipidCount: 0 } as IKeyData)
  }
  // Todo : Get Sessions Average Datas
  getSessionsAverage(): IAverageSessions[] { // :User
    const sessions = getDatas(this._id + '/average-sessions', 'sessions')
    // this._user.sessionsAverage = sessions && sessions
    // return this
    return sessions ? sessions : ([{ day: 0, sessionLength: 0 }] as IAverageSessions[])
  }
  // Todo : Get Sessions Activity Datas
  getSessionsActivity(): IActivitySession[] { // :User
    const sessions = getDatas(this._id + '/activity', 'sessions')
    // this._user.sessionsActivity = sessions && sessions
    // return this
    return sessions ? sessions : ([{ day: '1901-01-01', kilogram: 0, calories: 0 }] as IActivitySession[])
  }
  // Todo : Get Performance Datas
  getPerformances(): IValues[] { // :User
    const data: [] = getDatas(this._id + '/performance', 'data')
    const kinds = getDatas(this._id + '/performance', 'kind')
    const performances: IValues[] = []

    data &&
      data.map((perf: IValues) => {
        performances.push({ value: perf && perf.value, kind: kinds && kinds[perf.kind] })
      })

    // this._user.performances = performances && performances
    // return this
    return performances ? performances : ([{ value: 0, kind: '' }] as IValues[])
  }

  build(): IUser {
    this.getUserInfos()
    this.getTodayScore()
    // Todo
    /** 
     this.getKeyData()
     this.getSessionsAverage()
     this.getSessionsActivity()
     this.getPerformances()
     */

    return this._user
  }
}

export default User
