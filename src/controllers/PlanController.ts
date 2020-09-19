import { Request, Response } from 'express'
import { Application } from 'express'
import { PlanService } from '../services/PlanService'

export class PlanController {
  private planService: PlanService

  constructor(private app: Application) {
    this.planService = new PlanService()
    this.routes()
  }

  routes() {
    this.app.route('/plans').get(this.get.bind(this))
    this.app.route('/plans/:id').get(this.getOne.bind(this))
  }

  async get(_req: Request, res: Response) {
    try {
      const plans = await this.planService.find()
      res.json(plans)
    } catch (e) {
      //
    }
  }

  async getOne(req: Request, res: Response) {
    const id = req.params.id
    try {
      const plan = await this.planService.findOne(id)

      res.json(plan)
    } catch (e) {
      res.status(400)
    }
  }
}
