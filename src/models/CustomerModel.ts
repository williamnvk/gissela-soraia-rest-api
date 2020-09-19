import { model, Schema } from 'mongoose'
import { CustomerSchema } from '../types/customer'

const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      min: '1920-01-01',
      max: '2020-01-01',
    },
    token: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
)

export const CustomerModel = model<CustomerSchema>(
  'Customer',
  customerSchema,
  'customers'
)
