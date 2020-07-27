import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from './CreateAppointmentService'
import AppError from '@shared/errors/AppError'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let createAppointment: CreateAppointmentService

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository()

        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository
        )
    })

    it('shoud to be able to create a new appointment', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime()
        })

        const appointment =  await createAppointment.execute({
            date: new Date(2020, 4, 10, 13),
            user_id: 'user-id',
            provider_id: 'provider-id'
        })

        expect(appointment).toHaveProperty('id')
        expect(appointment.provider_id).toBe('provider-id')
    })

    it('should not be able to create two appointment on the same time', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
          return new Date(2020, 4, 10, 11).getTime()
        })

        const appointmentdate = new Date(2020, 4, 10, 11)

        await createAppointment.execute({
            date: appointmentdate,
            user_id: 'user-id',
            provider_id: 'provider-id'
        })

        await expect(
          createAppointment.execute({
            date: appointmentdate,
            user_id: 'user-id',
            provider_id: 'provider-id'
          }),
        ).rejects.toBeInstanceOf(AppError)
    })

    it('shoud not be able to create an appointment on a past date', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime()
        })

        await expect(createAppointment.execute({
            date: new Date(2020, 4, 10, 11),
            user_id: '123123',
            provider_id: '123123123'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('shoud not be able to create an appointment with same user as provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime()
        })

        await expect(createAppointment.execute({
            date: new Date(2020, 4, 10, 13),
            user_id: 'user-id',
            provider_id: 'user-id'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('shoud not be able to create an appointment before 8pm and after 5pm', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime()
        })

        await expect(createAppointment.execute({
            date: new Date(2020, 4, 11, 7),
            user_id: 'user-id',
            provider_id: 'provider-id'
        })).rejects.toBeInstanceOf(AppError)

        await expect(createAppointment.execute({
            date: new Date(2020, 4, 11, 18),
            user_id: 'user-id',
            provider_id: 'provider-id'
        })).rejects.toBeInstanceOf(AppError)
    })
})
