import { model, Schema } from 'mongoose'
import { CitySchema } from '../types/city'

const citySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      default: 'PR',
    },
  },
  {
    timestamps: true,
  }
)

export const CityModel = model<CitySchema>('City', citySchema, 'cities')
