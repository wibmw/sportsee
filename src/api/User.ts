import { getDatas } from './Api'
import { IUserInfos, IKeyData, IAverage, IActivitySession, IValues, IAverageSessions } from './Interfaces'

class User {
  protected readonly id: string

  constructor(id: string) {
    this.id = id
  }
  // Get User personnal Datas
  getUserInfos(): IUserInfos {
    const userInfos = getDatas(this.id, 'userInfos')

    return userInfos ? userInfos : ({ firstName: '', lastName: '', age: 0 } as IUserInfos)
  }
  // Get Today Score Datas
  getTodayScore(): number {
    const todayScore = getDatas(this.id, 'todayScore')

    return todayScore ? todayScore : 0
  }
  // Get Key Datas
  getKeyData(): IKeyData {
    const keyData = getDatas(this.id, 'keyData')

    return keyData
      ? keyData
      : ({ calorieCount: 0, proteinCount: 0, carbohydrateCount: 0, lipidCount: 0 } as IKeyData)
  }
  // Get Sessions Average Datas
  getSessionsAverage(): IAverageSessions[] {
    const sessions = getDatas(this.id + '/average-sessions', 'sessions')
    console.log(sessions)

    return sessions ? sessions : ([{ day: 0, sessionLength: 0 }] as IAverageSessions[])
  }
  // Get Sessions Activity Datas
  getSessionsActivity(): IActivitySession[] {
    const sessions = getDatas(this.id + '/activity', 'sessions')
    console.log(sessions)
    return sessions ? sessions : ([{ day: '1901-01-01', kilogram: 0, calories: 0 }] as IActivitySession[])
  }
  // Get Performance Datas
  getPerformances(): IValues[] {
    const data: [] = getDatas(this.id + '/performance', 'data')
    const kinds = getDatas(this.id + '/performance', 'kind')
    const performances: IValues[] = []

    data &&
      data.map((perf: IValues) => {
        performances.push({ value: perf && perf.value, kind: kinds && kinds[perf.kind] })
      })

    return performances ? performances : ([{ value: 0, kind: '' }] as IValues[])
  }
}

export default User
