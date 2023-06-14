export enum EGroupStatus {
  Active = 'active',
  Deleted = 'deleted',
}

export interface IGroup {
  createdAt: Date
  updatedAt: Date
  meta: {
    isPrivate: boolean
  }
  name: string
  status: EGroupStatus
}
