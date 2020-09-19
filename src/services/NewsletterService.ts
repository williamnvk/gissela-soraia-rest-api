import { NewsletterModel } from '../models/NewsletterModel'

export class NewsletterService {
  find() {
    return NewsletterModel.find().exec()
  }

  findOne(id: string) {
    return NewsletterModel.findById(id).exec()
  }

  create(data: any) {
    const Newsletter = new NewsletterModel(data)
    return Newsletter.save()
  }
}
