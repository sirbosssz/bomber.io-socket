import { Request, Response, Router } from 'express'
import path from 'path'

export default (route: Router) => {
  route.get('/', (req: Request, res: Response) => {
    res.send('Hello')
  })

  route.get('/debug', (_, res: Response) => {
    res.sendFile(path.resolve('./public/index.html'))
  })
}
