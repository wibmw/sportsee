// import { IUser } from './Interfaces'
import {getDatas} from './Api'
import User from './User'
import { IUserInfos, IKeyData, IAverage, IActivitySessions, IValues } from './Interfaces'

class Service {
  protected readonly _id: string

  constructor(id: string) {
    this._id = id
  }

  // Get User personnal Datas
  getUserInfos(): IUserInfos {
    const userInfos = getDatas(this._id, 'userInfos')
    return userInfos // ? userInfos : ({ firstName: '', lastName: '', age: 0 } as IUserInfos)
  }
  // Get Today Score Datas
  getTodayScore(): number {
    const todayScore = getDatas(this._id, 'todayScore')
    return todayScore // ? todayScore : 0
  }
  // Get Key Datas
  getKeyData(): IKeyData {
    const keyData = getDatas(this._id, 'keyData')
    return keyData // ? keyData : ({ calorieCount: 0, proteinCount: 0, carbohydrateCount: 0, lipidCount: 0 } as IKeyData)
  }
  // Get Sessions Average Datas
  getSessionsAverage(): IAverage {
    const sessions = getDatas(this._id + '/average-sessions', 'sessions')
    return sessions // ? sessions : ({} as IAverage)
  }
  // Get Sessions Activity Datas
  getSessionsActivity(): IActivitySessions {
    const sessions = getDatas(this._id + '/activity', 'sessions')
    return sessions // ? sessions : ({} as IActivitySessions)
  }
  // Get Performance Datas
  getPerformances() {
    const data: [] = getDatas(this._id + '/performance', 'data')
    const kinds = getDatas(this._id + '/performance', 'kind')
    const performances: IValues[] = []

    data &&
      data.map((perf: IValues) => {
        performances.push({ value: perf && perf.value, kind: kinds && kinds[perf.kind] })
      })

    return performances // ? performances : []
  }

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
