import { model, Schema } from 'mongoose'
import { NewsletterSchema } from '../types/newsletter'

const newsletterSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export const NewsletterModel = model<NewsletterSchema>(
  'Newsletter',
  newsletterSchema,
  'newsletters'
)
