import { model, Schema } from 'mongoose'
import { PlanSchema } from '../types/plan'

const planSchema = new Schema(
  {
    slug: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    photos: {
      type: Number,
      required: true,
      default: 15,
    },
    start_at: {
      type: Date,
      required: true,
    },
    end_at: {
      type: Date,
      required: true,
    },
    price: {
      type: String,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
)

export const PlanModel = model<PlanSchema>('Plan', planSchema, 'plans')
