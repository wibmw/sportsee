import { getDatas } from './Api'
import { IUserInfos, IKeyData, IAverage, IActivity, IValues } from './Interfaces'

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
  getSessionsAverage(): IAverage {
    const sessions = getDatas(this.id + '/average-sessions', 'sessions')

    return sessions ? sessions : ({} as IAverage)
  }
  // Get Sessions Activity Datas
  getSessionsActivity(): IActivity {
    const sessions = getDatas(this.id + '/activity', 'sessions')

    return sessions ? sessions : ({} as IActivity)
  }
  // Get Performance Datas
  getPerformances() {
    const data: [] = getDatas(this.id + '/performance', 'data')
    const kinds = getDatas(this.id + '/performance', 'kind')
    const performances: IValues[] = []

    data &&
      data.forEach((perf: IValues) => {
        performances.push({ value: perf && perf.value, kind: kinds && kinds[perf.kind] })
      })

    console.log(performances)

    return performances ? performances : []
  }
}

export default User
