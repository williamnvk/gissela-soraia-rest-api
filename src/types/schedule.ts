import { ObjectID } from 'mongodb'
import { Document, Schema } from 'mongoose'

export interface ScheduleSchema extends Document {
  _id: ObjectID
  description: string
  location: string
  start_at?: Date
  end_at?: Date
  plan: {
    type: Schema.Types.ObjectId
    required: true
    ref: 'Plan'
  }
  customer: {
    type: Schema.Types.ObjectId
    required: true
    ref: 'Customer'
  }
  // makeup:
  // payment
}
