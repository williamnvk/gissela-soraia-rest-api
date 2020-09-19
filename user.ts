import { model, Schema } from 'mongoose'
import { USER_STATE_DEFAULT } from '../constants/states'
import { IUser } from '../types/user'

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
    },
    state: {
      type: String,
      default: USER_STATE_DEFAULT,
      required: true,
    },
    level: {
      type: Schema.Types.ObjectId,
      Ref: 'Level',
    },
  },
  {
    timestamps: true,
  }
)

userSchema.virtual('username').get(function() {
  console.log('user model virtual username')
  // @ts-ignore
  const name = this.name.split(' ')[0]
  if (typeof name !== 'string') return ''
  return name.charAt(0).toUpperCase() + name.slice(1)
})

userSchema.statics.getUser = function(id: string) {
  console.log('user model statis getUser', { id })

  return this.findById(id)
    .populate([
      {
        path: 'room',
        model: 'Room',
        populate: { path: 'users', model: 'User' },
      },
      {
        path: 'level',
        model: 'Level',
      },
    ])
    .exec()
}

export const User = model<IUser>('User', userSchema)
