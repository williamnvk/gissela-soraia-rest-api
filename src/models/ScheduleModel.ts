import { model, Schema } from 'mongoose'
import { ScheduleSchema } from '../types/schedule'

const scheduleSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    start_at: {
      type: Date,
      required: true,
    },
    end_at: {
      type: Date,
      required: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Customer',
    },
    plan: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Plan',
    },
    // make
  },
  {
    timestamps: true,
  }
)

export const ScheduleModel = model<ScheduleSchema>(
  'Schedule',
  scheduleSchema,
  'schedules'
)
