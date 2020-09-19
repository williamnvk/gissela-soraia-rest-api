import { ObjectID } from 'mongodb'
import { Document, Schema } from 'mongoose'

export interface MediaSchema extends Document {
  _id: ObjectID
  // is_black_white: boolean
  can_publish: boolean
  is_chosen: boolean
  is_poster: boolean
  file: string
  schedule: {
    type: Schema.Types.ObjectId
    required: true
    ref: 'Schedule'
  }
  // paid
}
