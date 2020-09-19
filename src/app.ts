import express, { Application } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import { CityController } from './controllers/CityController'
import { CustomerController } from './controllers/CustomerController'
import { PlanController } from './controllers/PlanController'
import { ScheduleController } from './controllers/ScheduleController'
import { NewsletterController } from './controllers/NewsletterController'

dotenv.config()

class App {
  public app: Application

  public cityController: CityController
  public customerController: CustomerController
  public planController: PlanController
  public scheduleController: ScheduleController
  public newsletterController: NewsletterController

  constructor() {
    this.app = express()
    this.setConfig()
    this.setMongoConfig()
    this.middlewares()
    this.cityController = new CityController(this.app)
    this.customerController = new CustomerController(this.app)
    this.planController = new PlanController(this.app)
    this.scheduleController = new ScheduleController(this.app)
    this.newsletterController = new NewsletterController(this.app)
  }

  private setConfig() {
    this.app.use(bodyParser.json({ limit: '50mb' }))
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
    this.app.use(cors())
  }

  private middlewares() {}

  private setMongoConfig() {
    try {
      mongoose.Promise = global.Promise
      mongoose.connect(process.env.DATABASE_URL as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })

      console.log('=> mongo connected')
    } catch (e) {
      console.log('mongo', e)
    }
  }
}

export default new App().app
