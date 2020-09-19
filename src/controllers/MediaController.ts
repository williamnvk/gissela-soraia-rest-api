import { Request, Response } from 'express'
import { Application } from 'express'
import { MediaService } from '../services/MediaService'
import { body, validationResult } from 'express-validator'

export class MediaController {
  private mediaService: MediaService

  constructor(private app: Application) {
    this.mediaService = new MediaService()
    this.routes()
  }

  routes() {
    this.app
      .route('/medias')
      .get(this.get.bind(this))
      .post(
        [
          body('is_chosen')
            .isBoolean()
            .escape(),
          body('can_publish')
            .isBoolean()
            .escape(),
          body('is_poster')
            .isBoolean()
            .escape(),
          body('media_url')
            .notEmpty()
            .isMongoId(),
          body('schedule')
            .notEmpty()
            .isMongoId(),
        ],
        this.create.bind(this)
      )
    this.app
      .route('/medias/:id')
      .get(this.getOne.bind(this))
      .put(
        [
          body('is_chosen')
            .isBoolean()
            .escape(),
          body('is_poster')
            .isBoolean()
            .escape(),
        ],
        this.update.bind(this)
      )
  }

  async get(_req: Request, res: Response) {
    try {
      const medias = await this.mediaService.find()
      res.json(medias)
    } catch (e) {
      //
    }
  }

  async getOne(req: Request, res: Response) {
    const id = req.params.id
    try {
      const media = await this.mediaService.findOne(id)
      res.json(media)
    } catch (e) {
      res.status(400)
    }
  }

  async create(req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    // up to s3

    try {
      const media = await this.mediaService.create(req.body)
      res.json(media)
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
      await this.mediaService.update(id, req.body)
      res.status(200)
    } catch (e) {
      res.status(400).json(e)
    }
  }
}
