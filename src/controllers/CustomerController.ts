import { Request, Response } from 'express'
import { Application } from 'express'
import { CustomerService } from '../services/CustomerService'
import { body, validationResult } from 'express-validator'
import { generateCustomerToken } from '../helpers/generateCustomerToken'

const CustomerValidator = [
  body('name')
    .notEmpty()
    .withMessage('Customer name is required')
    .trim()
    .escape(),
  body('phone')
    .notEmpty()
    .withMessage('Customer phone number is required')
    .isMobilePhone('pt-BR')
    .withMessage(
      'Customer phone number need be as valid number, like: +559999999999'
    )
    .trim()
    .escape(),
  body('email')
    .isEmail()
    .withMessage('Customer email is invalid')
    .optional({ nullable: true })
    .normalizeEmail(),
]

export class CustomerController {
  private customerService: CustomerService

  constructor(private app: Application) {
    this.customerService = new CustomerService()
    this.routes()
  }

  routes() {
    this.app
      .route('/customers')
      .get(this.get.bind(this))
      .post(CustomerValidator, this.create.bind(this))
    this.app
      .route('/customers/:id')
      .get(this.getOne.bind(this))
      .put(CustomerValidator, this.update.bind(this))
      .patch(this.update.bind(this))
    this.app.route('/customers/check').post(this.check.bind(this))
    this.app.route('/customers/notify').post(this.notify.bind(this))
  }

  async get(_req: Request, res: Response) {
    try {
      const customers = await this.customerService.find()
      res.json(customers)
    } catch (e) {
      //
    }
  }

  async getOne(req: Request, res: Response) {
    const id = req.params.id
    try {
      const customer = await this.customerService.findOne(id)
      res.json(customer)
    } catch (e) {
      res.status(400)
    }
  }

  async create(req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const customer = await this.customerService.create({
        ...req.body,
        token: generateCustomerToken(),
      })
      res.json(customer)
    } catch (e) {
      res.status(400).json(e)
    }
  }

  async update(req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const id = req.params.id

    try {
      const customer = await this.customerService.update(id, {
        ...req.body,
        token: generateCustomerToken(),
      })
      res.status(200)
    } catch (e) {
      res.status(400).json(e)
    }
  }

  async refresh(req: Request, res: Response) {
    const id = req.params.id

    try {
      await this.customerService.update(id, {
        token: generateCustomerToken(),
      })
      res.status(200)
    } catch (e) {
      res.status(400).json(e)
    }
  }

  async check(req: Request, res: Response) {
    const { phone, token } = req.body

    try {
      const customer = await this.customerService.check(phone, token)
      if (!customer) {
        res.status(400).json({
          message: "Customer phone or token can't be validated",
        })
      }

      res.json(customer)
    } catch (e) {
      res.status(400).json(e)
    }
  }

  async notify(req: Request, res: Response) {
    const { phone } = req.body

    try {
      const customer = await this.customerService.findOneByPhone(phone)
      if (!customer) {
        res.status(400).json({
          message: 'Customer phone not found',
        })
      }

      // const { token } = customer;
      // call SMS service

      res.status(200)
    } catch (e) {
      res.status(400).json(e)
    }
  }
}
