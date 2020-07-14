import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'

import UsersController from '../controllers/UsersController'
import UserAvatarController from '../controllers/UserAvatarController'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const usersRouter = Router()

const usersContoller = new UsersController()
const userAvatarController = new UserAvatarController()

const upload = multer(uploadConfig)

usersRouter.post('/', usersContoller.create)

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    userAvatarController.update
)

export default usersRouter
