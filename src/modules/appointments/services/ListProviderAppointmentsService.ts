import { injectable, inject } from 'tsyringe'
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'

interface IRequest {
    provider_id: string
    day: number
    month: number
    year: number
}

@injectable()
export default class ListProviderAppointmentsService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
    ) {}
    public async execute({ provider_id, day, year, month }: IRequest): Promise<Appointment[]> {
       const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
        provider_id, day, year, month
       })

       return appointments
    }
}
