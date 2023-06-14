import { IUserDocument } from '@model/user.model'

export function capitalizedUsername(this: IUserDocument): string {
  return this.username.charAt(0).toUpperCase() + this.username.slice(1).toLowerCase()
}
