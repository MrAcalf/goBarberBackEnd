// import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService'
import FakeEmailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'

describe('SendForgotPasswordEmail', () => {
    it('shoud to be able to recover the password using the email', async () => {
        const fakeUsersRepository = new FakeUsersRepository()
        const fakeEmailProvider = new FakeEmailProvider()

        const sendEmail = jest.spyOn(fakeEmailProvider, 'sendMail')

        const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeEmailProvider
        )

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
})
