// User Infos Interfaces
export interface IUser {
  id: number
  userInfos: IUserInfos
  todayScore: number
  keyData: IKeyData
}

export interface IUserInfos {
  firstName?: string
  lastName?: string
  age?: number
}

export interface IKeyData {
  calorieCount: number
  proteinCount: number
  carbohydrateCount: number
  lipidCount: number
}

// Average Interfaces
export interface IAverage {
  sessions: IAverageSessions[]
}

export interface IAverageSessions {
  day: number
  sessionLength: number
}

// Perforrmance Interfaces
export interface IPerformance {
  performances: [IValues]
}

export interface IValues {
  value: string
  kind: string
}

// Activity Interfaces
export interface IActivity {
  sessions: [IActivitySessions]
}

export interface IActivitySessions {
  day: number
  sessionLength: number
}
