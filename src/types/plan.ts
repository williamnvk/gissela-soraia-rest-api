import { ObjectID } from 'mongodb'
import { Document } from 'mongoose'

export interface PlanSchema extends Document {
  _id: ObjectID
  slug: string
  name: string
  description: string
  start_at?: Date
  end_at?: Date
  price: number
  photos: number
}
