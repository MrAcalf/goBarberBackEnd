import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository'
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService'
import FakeEmailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'

let fakeUsersRepository: FakeUsersRepository
let fakeEmailProvider: FakeEmailProvider
let fakeUserTokensRepository: FakeUserTokensRepository
let sendForgotPasswordEmail: SendForgotPasswordEmailService

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()
        fakeEmailProvider = new FakeEmailProvider()
        fakeUserTokensRepository = new FakeUserTokensRepository()

        sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeEmailProvider,
            fakeUserTokensRepository
        )
    })

    it('shoud to be able to recover the password using the email', async () => {
        const sendEmail = jest.spyOn(fakeEmailProvider, 'sendMail')
        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        await sendForgotPasswordEmail.execute({
            email: 'johndoe@example.com',
        })

        expect(sendEmail).toHaveBeenCalled()
    })

    it('shoud not be able to recover a non-existing user password', async () => {
        await expect(sendForgotPasswordEmail.execute({
            email: 'johndoe@example.com',
        })).rejects.toBeInstanceOf(AppError)
    })

    it('shoud generate a forgot password token', async () => {
        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate')
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        await sendForgotPasswordEmail.execute({
            email: 'johndoe@example.com',
        })

        expect(generateToken).toHaveBeenCalledWith(user.id)
    })
})
