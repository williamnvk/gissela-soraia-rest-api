import { MediaModel } from '../models/MediaModel'

export class MediaService {
  find() {
    return MediaModel.find().exec()
  }

  findOne(id: string) {
    return MediaModel.findById(id).exec()
  }

  create(data: any) {
    const Media = new MediaModel(data)
    return Media.save()
  }

  update(id: string, data: any) {
    return MediaModel.findOneAndUpdate({ _id: id }, data, { upsert: true })
  }
}
