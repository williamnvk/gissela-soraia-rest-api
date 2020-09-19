import { ObjectID } from 'mongodb'
import { Document } from 'mongoose'

export interface CitySchema extends Document {
  _id: ObjectID
  name: string
  district: string
}
