import { CustomerModel } from '../models/CustomerModel'
import { ObjectID } from 'mongodb'

export class CustomerService {
  find() {
    return CustomerModel.find().exec()
  }

  findOne(id: string) {
    return CustomerModel.findById(id).exec()
  }

  findOneByPhone(phone: string) {
    return CustomerModel.findOne({ phone }).exec()
  }

  create(data: any) {
    const Customer = new CustomerModel(data)
    return Customer.save()
  }

  update(id: string, data: any) {
    return CustomerModel.findOneAndUpdate({ _id: id }, data, { upsert: true })
  }

  check(phone: string, token: string) {
    return CustomerModel.findOne({ phone, token }).exec()
  }
}
