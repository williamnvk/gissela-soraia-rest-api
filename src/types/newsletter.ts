import { ObjectID } from 'mongodb'
import { Document } from 'mongoose'

export interface NewsletterSchema extends Document {
  _id: ObjectID
  name: string
  email?: string
  phone?: string
}
