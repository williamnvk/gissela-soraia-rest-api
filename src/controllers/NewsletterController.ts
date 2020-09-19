import { Request, Response } from 'express'
import { Application } from 'express'
import { NewsletterService } from '../services/NewsletterService'
import { body, validationResult } from 'express-validator'

const NewsletterValidator = [
  body('name')
    .notEmpty()
    .trim()
    .escape()
    .isLength({ max: 50 }),
  body('phone')
    .optional({ nullable: true })
    .isMobilePhone('pt-BR')
    .withMessage(
      'Customer phone number need be as valid number, like: +559999999999'
    ),
  body('email')
    .optional({ nullable: true })
    .isLength({ max: 100 })
    .isEmail()
    .withMessage('Customer email is invalid')
    .trim()
    .normalizeEmail(),
]

export class NewsletterController {
  private newsletterService: NewsletterService

  constructor(private app: Application) {
    this.newsletterService = new NewsletterService()
    this.routes()
  }

  routes() {
    this.app
      .route('/newsletters')
      .get(this.get.bind(this))
      .post(NewsletterValidator, this.create.bind(this))
  }

  async create(req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const newsletter = await this.newsletterService.create(req.body)
      res.json(newsletter)
    } catch (e) {
      res.status(400).json(e)
    }
  }

  async get(_req: Request, res: Response) {
    try {
      const newsletters = await this.newsletterService.find()
      res.json(newsletters)
    } catch (e) {
      //
    }
  }
}
