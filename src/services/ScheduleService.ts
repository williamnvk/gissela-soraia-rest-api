import { ScheduleModel } from '../models/ScheduleModel'

const POPULATE = [
  {
    path: 'customer',
    model: 'Customer',
    populate: { path: 'customers', model: 'Customer' },
  },
  {
    path: 'plan',
    model: 'Plan',
    populate: { path: 'plans', model: 'Plan' },
  },
]

export class ScheduleService {
  find() {
    return ScheduleModel.find()
      .populate(POPULATE)
      .exec()
  }

  findOne(id: string) {
    return ScheduleModel.findById(id)
      .populate(POPULATE)
      .exec()
  }

  create(data: any) {
    const Customer = new ScheduleModel(data)
    return Customer.save()
  }
}
