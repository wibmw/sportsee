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

export interface IActivityItem {
  icon: string
  value: number
  name: string
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
  performances: IValues[]
}

export interface IValues {
  [key: string]: string | number
  value: number
  kind: number
}

// Activity Interfaces
export interface IActivity {
  sessions: [IActivitySessions]
}

export interface IActivitySessions {
  day: number
  sessionLength: number
}

export type userInfosProps = {
  firstName?: string
  lastName?: string
  age?: number
}
