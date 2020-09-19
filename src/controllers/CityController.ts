import { Request, Response } from 'express'
import { Application } from 'express'
import { CityService } from '../services/CityService'

export class CityController {
  private cityService: CityService

  constructor(private app: Application) {
    this.cityService = new CityService()
    this.routes()
  }

  routes() {
    this.app.route('/cities').get(this.get.bind(this))
  }

  async get(_req: Request, res: Response) {
    try {
      const cities = await this.cityService.find()
      res.json(cities)
    } catch (e) {
      //
    }
  }
}
