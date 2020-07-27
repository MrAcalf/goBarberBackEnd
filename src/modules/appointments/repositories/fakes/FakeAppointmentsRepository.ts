import { uuid } from 'uuidv4'
import { isEqual, getMonth, getDate, getYear } from 'date-fns'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IFindAllInMothFromProviderDTO from '@modules/appointments/dtos/IFindAllInMothFromProviderDTO'
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO'

class FakeAppointmentsRepository implements IAppointmentsRepository {
    private appointments: Appointment[] = []

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(
            appointment => isEqual(appointment.date, date)
        )

        return findAppointment
    }

    public async findAllInMothFromProvider(
        { provider_id, month, year }: IFindAllInMothFromProviderDTO
    ): Promise<Appointment[]> {
        const appointments = this.appointments.filter(
            appointment =>
                appointment.provider_id === provider_id &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year
        )

        return appointments
    }

    public async findAllInDayFromProvider({
        provider_id,
        day,
        month,
        year
    }: IFindAllInDayFromProviderDTO ): Promise<Appointment[]> {
        const appointments = this.appointments.filter(
            appointment =>
                appointment.provider_id === provider_id &&
                getDate(appointment.date) === day &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year
        )

        return appointments
    }

    public async create({ provider_id, user_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment()

        Object.assign(appointment, { id: uuid(), date, provider_id, user_id })

        this.appointments.push(appointment)

        return appointment
    }
}

export default FakeAppointmentsRepository
