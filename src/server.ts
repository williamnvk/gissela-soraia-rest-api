import app from './app'
import * as dotenv from 'dotenv'

dotenv.config()

app.listen(process.env.PORT, () =>
  console.log(`=> Listening on port ${process.env.PORT || 8080}`)
)
