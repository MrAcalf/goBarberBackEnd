import { Request, Response } from 'express'
import { container } from 'tsyringe'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'

export default class UserAvatarController {

    public async update(request: Request, response: Response): Promise<Response> {
        try {
            const updateUserAvatar = container.resolve(UpdateUserAvatarService)

            const user = await updateUserAvatar.execute({
                user_id: request.user.id,
                avatarFilename: request.file.filename
            })

            delete user.password

            return response.json(user)
        } catch (err) {
            return response.status(400).json({ error: err.message })
        }
    }
}
