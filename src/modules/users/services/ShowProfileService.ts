// import path from 'path'
// import fs from 'fs'

// import uploadConfig from '@config/upload'
import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import User from '@modules/users/infra/typeorm/entities/User'
import IUsersRepository from '../repositories/IUsersRepository'

interface IRequest {
    user_id: string
}

@injectable()
export default class ShowProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}
    public async execute({ user_id}: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id)

        if(!user) {
            throw new AppError('User not found')
        }

       return user
    }
}
