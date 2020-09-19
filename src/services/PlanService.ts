import { PlanModel } from '../models/PlanModel'

export class PlanService {
  find() {
    return PlanModel.find().exec()
  }

  findOne(id: string) {
    return PlanModel.findById(id).exec()
  }
}
