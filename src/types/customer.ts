import { ObjectID } from 'mongodb'
import { Document } from 'mongoose'

export interface CustomerSchema extends Document {
  _id: ObjectID
  name: string
  phone: string
  birthday?: Date
  token: string
  email?: string
}
