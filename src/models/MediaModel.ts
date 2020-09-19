import { model, Schema } from 'mongoose'
import { MediaSchema } from '../types/media'

const mediaSchema = new Schema(
  {
    can_publish: {
      type: Boolean,
      required: true,
      default: false,
    },
    is_chosen: {
      type: Boolean,
      required: true,
      default: false,
    },
    is_poster: {
      type: Boolean,
      required: true,
      default: false,
    },
    file: {
      type: String,
      required: true,
      trim: true,
    },
    schedule: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Schedule',
    },
  },
  {
    timestamps: true,
  }
)

export const MediaModel = model<MediaSchema>('Media', mediaSchema, 'media')
