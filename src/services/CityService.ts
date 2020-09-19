import { CityModel } from '../models/CityModel'

export class CityService {
  find() {
    return CityModel.find().exec()
  }
}
