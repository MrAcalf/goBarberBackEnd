// import path from 'path'
// import fs from 'fs'

// import uploadConfig from '@config/upload'
import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import User from '@modules/users/infra/typeorm/entities/User'
import IUsersRepository from '../repositories/IUsersRepository'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'

interface IRequest {
    user_id: string
    name: string
    email: string
    old_password?: string
    password?: string
}

@injectable()
export default class UpdateProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider
    ) {}
    public async execute({ user_id, name, email, old_password, password}: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id)

        if(!user) {
            throw new AppError('User not found')
        }

        const userWithUpdatedEmail = await this.usersRepository.findByEmail(email)

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
            throw new AppError('Email already in use')
        }

        if(password && !old_password) {
            throw new AppError('You need inform old password to set a new password')
        }

        if(password && old_password) {
            const checkOldPassword = await this.hashProvider.compareHash(
                old_password,

                user.password
            )

            if(!checkOldPassword) {
                throw new AppError('Old password does not match')
            }

            user.password = await this.hashProvider.generateHash(password)
        }

        user.name = name
        user.email = email

        return this.usersRepository.save(user)
    }
}
