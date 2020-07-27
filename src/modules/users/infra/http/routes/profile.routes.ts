import { Router } from 'express'

import ProfileController from '../controllers/ProfileController'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const profileRouter = Router()
const profileContoller = new ProfileController()

profileRouter.use(ensureAuthenticated)

profileRouter.get('/', profileContoller.show)
profileRouter.put('/', profileContoller.update)

export default profileRouter
