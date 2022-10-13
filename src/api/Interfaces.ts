// User Infos Interfaces
export interface IUser {
  userInfos: IUserInfos
  todayScore: number
  sessionsActivity: IActivitySession[]
  sessionsAverage: IAverageSessions[]
  performances: IValues[]
  keyData: IKeyData
}
export interface IUserInfos {
  firstName: string
  lastName?: string
  age?: number
}
// Key Interfaces
export interface IKeyData {
  calorieCount: number
  proteinCount: number
  carbohydrateCount: number
  lipidCount: number
}
// Activity Interfaces
export interface IActivityItem {
  icon: string
  value: number
  name: string
  unit: string
}
// Average Interfaces
export interface IAverageSessions {
  [key: string]: string | number
  day: number
  sessionLength: number
}
// Performances Interfaces
export interface IValues {
  [key: string]: string | number
  value: number
  kind: string | number
}
// Activity Interfaces
export interface IActivitySession {
  [key: string]: string | number
  day: string
  kilogram: number
  calories: number
}
export interface IActivitySessions {
  session: IActivitySession[]
}

// Create an interface for the size of the window
export interface Size {
  width: number
  height: number
}
