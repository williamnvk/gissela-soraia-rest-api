import { Request, Response } from 'express'
import { Application } from 'express'
import { ScheduleService } from '../services/ScheduleService'
import { body, validationResult } from 'express-validator'

const ScheduleValidator = [
  body('description')
    .trim()
    .escape(),
  body('location')
    .notEmpty()
    .trim()
    .escape(),
  body('customer')
    .isMongoId()
    .notEmpty()
    .withMessage('Customer is required'),
  body('plan')
    .isMongoId()
    .notEmpty()
    .withMessage('Customer is required'),
  body('start_at').notEmpty(),
  body('end_at').notEmpty(),
]

export class ScheduleController {
  private scheduleService: ScheduleService

  constructor(private app: Application) {
    this.scheduleService = new ScheduleService()
    this.routes()
  }

  routes() {
    this.app
      .route('/schedules')
      .get(this.get.bind(this))
      .post(ScheduleValidator, this.create.bind(this))
    this.app.route('/schedules/:id').get(this.getOne.bind(this))
  }

  async create(req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const schedule = await this.scheduleService.create(req.body)
      res.json(schedule)
    } catch (e) {
      res.status(400).json(e)
    }
  }

  async get(_req: Request, res: Response) {
    try {
      const schedules = await this.scheduleService.find()
      res.json(schedules)
    } catch (e) {
      //
    }
  }

  async getOne(req: Request, res: Response) {
    const id = req.params.id
    try {
      const schedule = await this.scheduleService.findOne(id)

      res.json(schedule)
    } catch (e) {
      res.status(400)
    }
  }
}
